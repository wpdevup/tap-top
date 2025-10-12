<?php
/**
 * Plugin Name: Tap Top
 * Description: Lightweight back-to-top button with scroll progress ring, smart scroll and strong compatibility (Lenis/Locomotive/SmoothScrollbar). No jQuery required.
 * Version:     1.2.0
 * Author:      iruserwp9
 * Author URI:  https://profiles.wordpress.org/iruserwp9/
 * Text Domain: tap-top
 * Domain Path: /languages
 * License:     GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'TAPTOP_VERSION', '1.2.0' );
define( 'TAPTOP_PLUGIN_FILE', __FILE__ );
define( 'TAPTOP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'TAPTOP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once TAPTOP_PLUGIN_DIR . 'includes/class-taptop-settings.php';

// Load block class
require_once TAPTOP_PLUGIN_DIR . 'includes/class-taptop-block.php';

class TapTop_Plugin {
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	private function get_options() {
		$defaults = array(
			'enabled'             => 1,
			'show_on_mobile'      => 1,
			'position'            => 'right',
			'size'                => 48,
			'bg_color'            => '#111111',
			'icon_color'          => '#ffffff',
			'show_progress'       => 0,
			'progress_color'      => '#007cba',
			'display_mode'        => 'global',
			'adaptive_positioning'=> 1,
			'show_on_home'        => 1,
			'show_on_posts'       => 1,
			'show_on_pages'       => 1,
			'show_on_archives'    => 1,
			'show_on_search'      => 1,
			'progress_bg_color'   => 'rgba(255,255,255,0.2)',
			'exclude_content'     => '',
		);
		$opts = get_option( 'taptop_options', array() );
		return wp_parse_args( $opts, $defaults );
	}

	public function enqueue_assets() {
		$opt = $this->get_options();
		
		// Check display mode FIRST
		$display_mode = isset( $opt['display_mode'] ) ? $opt['display_mode'] : 'global';
		
		// If Block-Only Mode, do NOT load ANY global assets
		if ( $display_mode === 'blocks_only' ) {
			return;
		}
		
		// FIXED: In Hybrid Mode, if page has TapTop blocks, let blocks take over
		if ( $display_mode === 'hybrid' ) {
			// Check using WordPress native function
			if ( function_exists( 'has_block' ) && has_block( 'taptop/button' ) ) {
				return; // Blocks will handle everything on this page
			}
			
			// Alternative check using our class method (fallback)
			if ( class_exists( 'TapTop_Block' ) && TapTop_Block::page_has_blocks() ) {
				return; // Blocks detected, skip global
			}
		}
		
		// For Global Mode and Hybrid Mode (without blocks), continue with global assets
		// Hybrid Mode: Load global assets, blocks will override if present
		
		// Check if globally enabled
		if ( empty( $opt['enabled'] ) ) {
			return;
		}
		
		// Global Mode & Hybrid Mode: Check page types
		if ( ! $this->should_show_on_current_page_type( $opt ) ) {
			return;
		}
		
		// Mobile check
		if ( wp_is_mobile() && empty( $opt['show_on_mobile'] ) ) { 
			return; 
		}

		// Enqueue for Global Mode and Hybrid Mode
		wp_register_style( 'taptop', TAPTOP_PLUGIN_URL . 'assets/css/taptop.css', array(), TAPTOP_VERSION );
		wp_enqueue_style( 'taptop' );
		wp_enqueue_style( 'dashicons' );

		wp_register_script( 'taptop', TAPTOP_PLUGIN_URL . 'assets/js/taptop.js', array(), TAPTOP_VERSION, false );
		
		// Global config for Global Mode and Hybrid Mode
		// In Hybrid Mode, this will be used unless overridden by blocks
		wp_add_inline_script( 'taptop', 'window.TapTopConfig = ' . wp_json_encode( array(
			'position'            => $opt['position'],
			'size'                => (int) $opt['size'],
			'showAfter'           => 200,
			'offsetBottom'        => 24,
			'offsetSide'          => 24,
			'bgColor'             => $opt['bg_color'],
			'iconColor'           => $opt['icon_color'],
			'ariaLabel'           => __( 'Back to top', 'tap-top' ),
			'easing'              => 'smooth',
			'showProgress'        => (int) $opt['show_progress'],
			'progressColor'       => $opt['progress_color'],
			'progressWidth'       => 3,
			'progressBgColor'     => isset( $opt['progress_bg_color'] ) ? $opt['progress_bg_color'] : 'rgba(255,255,255,0.2)',
			'adaptivePositioning' => (int) $opt['adaptive_positioning'],
		) ) . ';', 'before' );
		wp_enqueue_script( 'taptop' );
	}

	/**
	 * Check if button should show based on current page type
	 */
	private function should_show_on_current_page_type( $options ) {
		global $post;
		
		// Check if current post/page is in exclude list
		if ( $post && ! empty( $options['exclude_content'] ) ) {
			$excluded_items = json_decode( $options['exclude_content'], true );
			if ( is_array( $excluded_items ) ) {
				foreach ( $excluded_items as $item ) {
					if ( isset( $item['id'] ) && $item['id'] == $post->ID ) {
						return false; // Don't show on excluded content
					}
				}
			}
		}
		
		// Homepage/Front page
		if ( is_front_page() || is_home() ) {
			return ! empty( $options['show_on_home'] );
		}
		
		// Individual posts
		if ( is_single() && ! is_attachment() ) {
			return ! empty( $options['show_on_posts'] );
		}
		
		// Individual pages
		if ( is_page() && ! is_front_page() ) {
			return ! empty( $options['show_on_pages'] );
		}
		
		// Archive pages (category, tag, author, date, etc.)
		if ( is_archive() ) {
			return ! empty( $options['show_on_archives'] );
		}
		
		// Search results
		if ( is_search() ) {
			return ! empty( $options['show_on_search'] );
		}
		
		// For any other pages (like custom post types, etc.)
		// Default to showing the button
		return true;
	}
}

new TapTop_Plugin();