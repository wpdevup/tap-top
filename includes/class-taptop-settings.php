<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

class TapTop_Settings {
	public function __construct() {
		if ( is_admin() ) {
			add_action( 'admin_menu', array( $this, 'add_menu' ) );
			add_action( 'admin_init', array( $this, 'register_settings' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'admin_assets' ) );
			add_action( 'wp_ajax_taptop_search_content', array( $this, 'ajax_search_content' ) );
		}
	}

	public function admin_assets( $hook ) {
		if ( 'toplevel_page_tap-top' !== $hook ) { return; }
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );
		wp_enqueue_script( 'jquery' );
		
		// Enqueue admin CSS and JS
		wp_enqueue_style( 'taptop-admin', TAPTOP_PLUGIN_URL . 'assets/css/taptop-admin.css', array(), TAPTOP_VERSION );
		wp_enqueue_script( 'taptop-admin', TAPTOP_PLUGIN_URL . 'assets/js/taptop-admin.js', array( 'jquery', 'wp-color-picker' ), TAPTOP_VERSION, true );
		
		// Localize script for AJAX
		wp_localize_script( 'taptop-admin', 'taptopAjax', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'taptop_settings' )
		) );
		
		// Add inline script for display mode toggle - FIXED: Using wp_add_inline_script
		$toggle_script = "
		jQuery(document).ready(function($) {
			function toggleGlobalOptions() {
				var mode = $(\"select[name='taptop_options[display_mode]']\").val();
				if (mode === 'blocks_only') {
					$('.taptop-global-only').hide();
				} else {
					$('.taptop-global-only').show();
				}
			}
			
			toggleGlobalOptions();
			$(\"select[name='taptop_options[display_mode]']\").on('change', toggleGlobalOptions);
		});
		";
		wp_add_inline_script( 'taptop-admin', $toggle_script, 'after' );
	}

	public function add_menu() {
		add_menu_page(
			'Tap Top',
			'Tap Top',
			'manage_options',
			'tap-top',
			array( $this, 'render_page' ),
			'dashicons-arrow-up-alt2',
			25
		);
	}

	public function register_settings() {
		register_setting( 'taptop_group', 'taptop_options', array( $this, 'sanitize' ) );
	}
	
	public function sanitize( $input ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			return get_option( 'taptop_options', array() );
		}

		$clean = array();
		
		// Add success message
		add_settings_error(
			'taptop_options',
			'taptop_settings_updated',
			__( 'Settings saved successfully.', 'tap-top' ),
			'success'
		);
		// Display Control settings
		$clean['enabled'] = empty( $input['enabled'] ) ? 0 : 1;
		$clean['display_mode'] = in_array( isset( $input['display_mode'] ) ? $input['display_mode'] : 'global', array( 'global', 'blocks_only', 'hybrid' ), true ) ? $input['display_mode'] : 'global';
		$clean['adaptive_positioning'] = empty( $input['adaptive_positioning'] ) ? 0 : 1;
		
		// Appearance settings
		$clean['position'] = in_array( isset( $input['position'] ) ? $input['position'] : 'right', array( 'left', 'right' ), true ) ? $input['position'] : 'right';
		$clean['size'] = max( 24, min( 80, intval( isset( $input['size'] ) ? $input['size'] : 48 ) ) );
		$clean['bg_color'] = sanitize_text_field( isset( $input['bg_color'] ) ? $input['bg_color'] : '#111111' );
		$clean['icon_color'] = sanitize_text_field( isset( $input['icon_color'] ) ? $input['icon_color'] : '#ffffff' );
		
		// Progress Ring settings
		$clean['show_progress'] = empty( $input['show_progress'] ) ? 0 : 1;
		$clean['progress_color'] = sanitize_text_field( isset( $input['progress_color'] ) ? $input['progress_color'] : '#007cba' );
		$clean['progress_width'] = max( 1, min( 10, intval( isset( $input['progress_width'] ) ? $input['progress_width'] : 3 ) ) );
		$clean['progress_bg_color'] = sanitize_text_field( isset( $input['progress_bg_color'] ) ? $input['progress_bg_color'] : 'rgba(255,255,255,0.5)' );
		
		// Page type settings
		$clean['show_on_home'] = empty( $input['show_on_home'] ) ? 0 : 1;
		$clean['show_on_posts'] = empty( $input['show_on_posts'] ) ? 0 : 1;
		$clean['show_on_pages'] = empty( $input['show_on_pages'] ) ? 0 : 1;
		$clean['show_on_archives'] = empty( $input['show_on_archives'] ) ? 0 : 1;
		$clean['show_on_search'] = empty( $input['show_on_search'] ) ? 0 : 1;
		
		// Exclude content settings
		$clean['exclude_content'] = isset( $input['exclude_content'] ) ? sanitize_text_field( $input['exclude_content'] ) : '';
		
		return $clean;
	}

	/**
	 * AJAX handler for searching posts/pages
	 */
	public function ajax_search_content() {
		// Check nonce and capabilities
		if ( ! current_user_can( 'manage_options' ) || ! check_ajax_referer( 'taptop_settings', 'nonce', false ) ) {
			wp_send_json_error( 'Unauthorized' );
		}

		$search = isset( $_POST['search'] ) ? sanitize_text_field( wp_unslash( $_POST['search'] ) ) : '';
		if ( strlen( $search ) < 2 ) {
			wp_send_json_success( array() );
		}

		$results = array();

		// Search posts
		$posts = get_posts( array(
			's' => $search,
			'post_type' => array( 'post', 'page' ),
			'post_status' => 'publish',
			'posts_per_page' => 20,
			'orderby' => 'relevance',
		) );

		foreach ( $posts as $post ) {
			$results[] = array(
				'id' => $post->ID,
				'title' => $post->post_title,
				'type' => $post->post_type,
			);
		}

		wp_send_json_success( $results );
	}

	public function render_page() {
		// Verify user capabilities
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		
		$options = get_option( 'taptop_options', array() );
		$enabled = isset( $options['enabled'] ) ? $options['enabled'] : 1;
		$display_mode = isset( $options['display_mode'] ) ? $options['display_mode'] : 'global';
		$adaptive_positioning = isset( $options['adaptive_positioning'] ) ? $options['adaptive_positioning'] : 1;
		$position = isset( $options['position'] ) ? $options['position'] : 'right';
		$size = isset( $options['size'] ) ? $options['size'] : 48;
		$bg_color = isset( $options['bg_color'] ) ? $options['bg_color'] : '#111111';
		$icon_color = isset( $options['icon_color'] ) ? $options['icon_color'] : '#ffffff';
		$show_progress = isset( $options['show_progress'] ) ? $options['show_progress'] : 0;
		$progress_color = isset( $options['progress_color'] ) ? $options['progress_color'] : '#007cba';
		$progress_width = isset( $options['progress_width'] ) ? $options['progress_width'] : 3;
		$progress_bg_color = isset( $options['progress_bg_color'] ) ? $options['progress_bg_color'] : 'rgba(255,255,255,0.2)';
		$show_on_home = isset( $options['show_on_home'] ) ? $options['show_on_home'] : 1;
		$show_on_posts = isset( $options['show_on_posts'] ) ? $options['show_on_posts'] : 1;
		$show_on_pages = isset( $options['show_on_pages'] ) ? $options['show_on_pages'] : 1;
		$show_on_archives = isset( $options['show_on_archives'] ) ? $options['show_on_archives'] : 1;
		$show_on_search = isset( $options['show_on_search'] ) ? $options['show_on_search'] : 1;
		$exclude_content = isset( $options['exclude_content'] ) ? $options['exclude_content'] : '';
		
		// Parse excluded content
		$excluded_items = array();
		if ( ! empty( $exclude_content ) ) {
			$decoded = json_decode( $exclude_content, true );
			if ( is_array( $decoded ) ) {
				$excluded_items = $decoded;
			}
		}
		
		echo '<div class="wrap">';
		echo '<h1>' . esc_html__( 'Tap Top Settings', 'tap-top' ) . '</h1>';
		
		// Display settings errors/success messages
		settings_errors( 'taptop_options' );
		
		echo '<form method="post" action="options.php">';
		settings_fields( 'taptop_group' );
		echo '<table class="form-table">';
		
		// Display Control
		echo '<tr><th colspan="2"><h3>' . esc_html__( 'Display Control', 'tap-top' ) . '</h3></th></tr>';
		echo '<tr><th>' . esc_html__( 'Enable Plugin', 'tap-top' ) . '</th><td><input type="checkbox" name="taptop_options[enabled]" value="1"' . checked( 1, $enabled, false ) . ' /> ' . esc_html__( 'Enable Tap Top plugin', 'tap-top' ) . '<br><small>' . esc_html__( 'Master switch for the entire plugin (affects both Global and Block modes)', 'tap-top' ) . '</small></td></tr>';
		echo '<tr><th>' . esc_html__( 'Display Mode', 'tap-top' ) . '</th><td>';
		echo '<select name="taptop_options[display_mode]">';
		echo '<option value="global"' . selected( $display_mode, 'global', false ) . '>' . esc_html__( 'Global Mode (Show everywhere based on settings below)', 'tap-top' ) . '</option>';
		echo '<option value="blocks_only"' . selected( $display_mode, 'blocks_only', false ) . '>' . esc_html__( 'Block-Only Mode (Show only where blocks are added)', 'tap-top' ) . '</option>';
		echo '<option value="hybrid"' . selected( $display_mode, 'hybrid', false ) . '>' . esc_html__( 'Hybrid Mode (Global settings + Block override)', 'tap-top' ) . '</option>';
		echo '</select>';
		echo '<br><small>' . esc_html__( 'Global: Uses settings below | Block-Only: Each block has its own settings | Hybrid: Global everywhere, blocks override per page', 'tap-top' ) . '</small>';
		echo '</td></tr>';
		
		// Adaptive Positioning Toggle
		echo '<tr><th>' . esc_html__( 'Adaptive Positioning', 'tap-top' ) . '</th><td>';
		echo '<input type="checkbox" name="taptop_options[adaptive_positioning]" value="1"' . checked( 1, $adaptive_positioning, false ) . ' /> ' . esc_html__( 'Enable Smart Obstruction Avoidance', 'tap-top' );
		echo '<br><small>' . esc_html__( 'Automatically adjusts button position to avoid fixed elements like cookie banners, chat widgets, and other overlapping content. Includes mobile safe-area support.', 'tap-top' ) . '</small>';
		echo '</td></tr>';
		
		// Show on specific page types (only for Global mode and Hybrid mode)
		echo '<tbody class="taptop-global-only">';
		echo '<tr><th>' . esc_html__( 'Show on Homepage', 'tap-top' ) . '</th><td><input type="checkbox" name="taptop_options[show_on_home]" value="1"' . checked( 1, $show_on_home, false ) . ' /> ' . esc_html__( 'Show on homepage', 'tap-top' ) . '</td></tr>';
		echo '<tr><th>' . esc_html__( 'Show on Posts', 'tap-top' ) . '</th><td><input type="checkbox" name="taptop_options[show_on_posts]" value="1"' . checked( 1, $show_on_posts, false ) . ' /> ' . esc_html__( 'Show on individual posts', 'tap-top' ) . '</td></tr>';
		echo '<tr><th>' . esc_html__( 'Show on Pages', 'tap-top' ) . '</th><td><input type="checkbox" name="taptop_options[show_on_pages]" value="1"' . checked( 1, $show_on_pages, false ) . ' /> ' . esc_html__( 'Show on individual pages', 'tap-top' ) . '</td></tr>';
		echo '<tr><th>' . esc_html__( 'Show on Archives', 'tap-top' ) . '</th><td><input type="checkbox" name="taptop_options[show_on_archives]" value="1"' . checked( 1, $show_on_archives, false ) . ' /> ' . esc_html__( 'Show on archive pages (category, tag, etc.)', 'tap-top' ) . '</td></tr>';
		echo '<tr><th>' . esc_html__( 'Show on Search', 'tap-top' ) . '</th><td><input type="checkbox" name="taptop_options[show_on_search]" value="1"' . checked( 1, $show_on_search, false ) . ' /> ' . esc_html__( 'Show on search results', 'tap-top' ) . '</td></tr>';
		
		// Exclude specific content section
		echo '<tr><th>' . esc_html__( "Don't Show on These Pages", 'tap-top' ) . '</th><td>';
		echo '<div class="taptop-content-selector">';
		echo '<div class="taptop-search-container">';
		echo '<input type="text" id="taptop-content-search" placeholder="' . esc_attr__( 'Search posts and pages...', 'tap-top' ) . '" style="width: 100%; padding: 8px;" />';
		echo '<div class="taptop-search-results" style="display: none;"></div>';
		echo '</div>';
		echo '<div class="taptop-selected-content">';
		echo '<h4>' . esc_html__( 'Excluded Content:', 'tap-top' ) . '</h4>';
		echo '<div class="taptop-excluded-list" id="taptop-excluded-list">';
		
		// Display current excluded items
		foreach ( $excluded_items as $item ) {
			$type_label = $item['type'] === 'page' ? esc_html__( 'Page', 'tap-top' ) : esc_html__( 'Post', 'tap-top' );
			echo '<div class="taptop-excluded-item" data-id="' . esc_attr( $item['id'] ) . '" data-type="' . esc_attr( $item['type'] ) . '">';
			echo '<span class="taptop-item-title">' . esc_html( $item['title'] ) . '</span>';
			echo '<span class="taptop-item-type">(' . esc_html( $type_label ) . ' #' . esc_html( $item['id'] ) . ')</span>';
			echo '<button type="button" class="taptop-remove-item" title="' . esc_attr__( 'Remove', 'tap-top' ) . '">&times;</button>';
			echo '</div>';
		}
		
		echo '</div>';
		echo '</div>';
		echo '<input type="hidden" name="taptop_options[exclude_content]" id="taptop-exclude-content-data" value="' . esc_attr( $exclude_content ) . '" />';
		echo '<p class="description">' . esc_html__( "Search and select posts/pages where you don't want the button to appear.", 'tap-top' ) . '</p>';
		echo '</div>';
		echo '</td></tr>';
		
		echo '</tbody>';
		
		// Appearance (only for Global mode and Hybrid mode)
		echo '<tbody class="taptop-global-only">';
		echo '<tr><th colspan="2"><h3>' . esc_html__( 'Appearance', 'tap-top' ) . '</h3></th></tr>';
		echo '<tr><th>' . esc_html__( 'Position', 'tap-top' ) . '</th><td>';
		echo '<select name="taptop_options[position]">';
		echo '<option value="right"' . selected( $position, 'right', false ) . '>' . esc_html__( 'Bottom Right', 'tap-top' ) . '</option>';
		echo '<option value="left"' . selected( $position, 'left', false ) . '>' . esc_html__( 'Bottom Left', 'tap-top' ) . '</option>';
		echo '</select>';
		echo '</td></tr>';
		
		echo '<tr><th>' . esc_html__( 'Button Size (px)', 'tap-top' ) . '</th><td>';
		echo '<input type="number" name="taptop_options[size]" value="' . esc_attr( $size ) . '" min="24" max="80" />';
		echo '</td></tr>';
		
		echo '<tr><th>' . esc_html__( 'Background Color', 'tap-top' ) . '</th><td>';
		echo '<input type="text" name="taptop_options[bg_color]" value="' . esc_attr( $bg_color ) . '" class="color-field" />';
		echo '</td></tr>';
		
		echo '<tr><th>' . esc_html__( 'Icon Color', 'tap-top' ) . '</th><td>';
		echo '<input type="text" name="taptop_options[icon_color]" value="' . esc_attr( $icon_color ) . '" class="color-field" />';
		echo '</td></tr>';
		echo '</tbody>';
		
		// Progress Ring (only for Global mode and Hybrid mode)
		echo '<tbody class="taptop-global-only">';
		echo '<tr><th colspan="2"><h3>' . esc_html__( 'Progress Ring', 'tap-top' ) . '</h3></th></tr>';
		echo '<tr><th>' . esc_html__( 'Enable Progress Ring', 'tap-top' ) . '</th><td>';
		echo '<input type="checkbox" name="taptop_options[show_progress]" value="1"' . checked( 1, $show_progress, false ) . ' /> ' . esc_html__( 'Enable', 'tap-top' );
		echo '<br><small>' . esc_html__( 'Shows scroll progress around button', 'tap-top' ) . '</small>';
		echo '</td></tr>';
		
		echo '<tr><th>' . esc_html__( 'Progress Ring Color', 'tap-top' ) . '</th><td>';
		echo '<input type="text" name="taptop_options[progress_color]" value="' . esc_attr( $progress_color ) . '" class="color-field" />';
		echo '</td></tr>';
		
		echo '<tr><th>' . esc_html__( 'Ring Width (px)', 'tap-top' ) . '</th><td>';
		echo '<input type="number" name="taptop_options[progress_width]" value="' . esc_attr( $progress_width ) . '" min="1" max="10" />';
		echo '<br><small>' . esc_html__( 'Thickness of the progress ring (1-10px)', 'tap-top' ) . '</small>';
		echo '</td></tr>';
		
		echo '<tr><th>' . esc_html__( 'Ring Background Color', 'tap-top' ) . '</th><td>';
		echo '<input type="text" name="taptop_options[progress_bg_color]" value="' . esc_attr( $progress_bg_color ) . '" class="color-field" />';
		echo '<br><small>' . esc_html__( 'Background ring color (supports rgba)', 'tap-top' ) . '</small>';
		echo '</td></tr>';
		echo '</tbody>';
		
		echo '</table>';
		submit_button();
		echo '</form>';
		
		// Enhanced Features Information
		echo '<div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-left: 4px solid #007cba; border-radius: 4px;">';
		echo '<h3 style="margin-top: 0; color: #007cba;">' . esc_html__( 'Enhanced Features Active', 'tap-top' ) . '</h3>';
		echo '<p style="margin-bottom: 15px;">' . esc_html__( 'Your Tap Top plugin includes advanced features that work automatically behind the scenes:', 'tap-top' ) . '</p>';
		
		echo '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">';
		
		// Library-Aware Behavior
		echo '<div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e1e1e1;">';
		echo '<h4 style="margin: 0 0 8px 0; color: #333; font-size: 14px;"><span style="color: #007cba;">⚡</span> ' . esc_html__( 'Smart Scroll Library Detection', 'tap-top' ) . '</h4>';
		echo '<p style="margin: 0; font-size: 13px; color: #666;">' . esc_html__( 'Automatically detects and integrates with Lenis, Locomotive Scroll, and SmoothScrollbar libraries for seamless compatibility.', 'tap-top' ) . '</p>';
		echo '</div>';
		
		// Universal Anchor Fixes
		echo '<div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e1e1e1;">';
		echo '<h4 style="margin: 0 0 8px 0; color: #333; font-size: 14px;"><span style="color: #007cba;">🔗</span> ' . esc_html__( 'Universal Anchor Link Fixes', 'tap-top' ) . '</h4>';
		echo '<p style="margin: 0; font-size: 13px; color: #666;">' . esc_html__( 'Makes anchor links and table of contents work smoothly with modern scroll libraries. Fixes common jumping and broken navigation issues.', 'tap-top' ) . '</p>';
		echo '</div>';
		
		// Accessibility & Performance
		echo '<div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e1e1e1;">';
		echo '<h4 style="margin: 0 0 8px 0; color: #333; font-size: 14px;"><span style="color: #007cba;">♿</span> ' . esc_html__( 'Accessibility & Performance', 'tap-top' ) . '</h4>';
		echo '<p style="margin: 0; font-size: 13px; color: #666;">' . esc_html__( 'Respects user motion preferences, includes proper ARIA labels, and uses GPU-accelerated animations for optimal performance.', 'tap-top' ) . '</p>';
		echo '</div>';
		
		// Adaptive Positioning
		if ( $adaptive_positioning ) {
			echo '<div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e1e1e1;">';
			echo '<h4 style="margin: 0 0 8px 0; color: #333; font-size: 14px;"><span style="color: #007cba;">📱</span> ' . esc_html__( 'Smart Positioning Active', 'tap-top' ) . '</h4>';
			echo '<p style="margin: 0; font-size: 13px; color: #666;">' . esc_html__( 'Button automatically avoids cookie banners, chat widgets, and mobile safe areas. Works perfectly on notched devices.', 'tap-top' ) . '</p>';
			echo '</div>';
		}
		
		echo '</div>';
		echo '<p style="margin: 15px 0 0 0; font-size: 12px; color: #888; font-style: italic;">' . esc_html__( 'These features work automatically and require no additional configuration. Check browser console for technical details.', 'tap-top' ) . '</p>';
		echo '</div>';
		
		// REMOVED: inline script tag - now handled by wp_add_inline_script in admin_assets()
		
		echo '</div>';
	}
}

new TapTop_Settings();