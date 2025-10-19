<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

class TapTop_Block {
	private static $block_instances = 0;
	private static $block_configs = array();
	private static $has_blocks_on_page = false;

	public function __construct() {
		if ( function_exists( 'register_block_type' ) ) {
			add_action( 'init', array( $this, 'register_block' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
			add_action( 'wp_footer', array( $this, 'output_block_configs' ), 5 );
		}
	}

	public static function page_has_blocks() {
		return self::$has_blocks_on_page;
	}

	public function register_block() {
		register_block_type( 'taptop/button', array(
			'attributes' => array(
				'enabled' => array( 'type' => 'boolean', 'default' => true ),
				'position' => array( 'type' => 'string', 'default' => 'right' ),
				'size' => array( 'type' => 'number', 'default' => 48 ),
				'bgColor' => array( 'type' => 'string', 'default' => '#111111' ),
				'iconColor' => array( 'type' => 'string', 'default' => '#ffffff' ),
				'showProgress' => array( 'type' => 'boolean', 'default' => false ),
				'progressColor' => array( 'type' => 'string', 'default' => '#007cba' ),
				'progressWidth' => array( 'type' => 'number', 'default' => 3 ),
				'progressBgColor' => array( 'type' => 'string', 'default' => 'rgba(255,255,255,0.2)' ),
				'showAfter' => array( 'type' => 'number', 'default' => 200 ),
				'offsetBottom' => array( 'type' => 'number', 'default' => 24 ),
				'offsetSide' => array( 'type' => 'number', 'default' => 24 ),
				'buttonShape' => array( 'type' => 'string', 'default' => 'circle' ),
				'animationStyle' => array( 'type' => 'string', 'default' => 'fade' ),
				'hideOnScrollDown' => array( 'type' => 'boolean', 'default' => false ),
			),
			'render_callback' => array( $this, 'render_block' ),
		) );
	}

	public function editor_assets() {
		wp_enqueue_script(
			'taptop-block-editor',
			TAPTOP_PLUGIN_URL . 'assets/js/taptop-block.js',
			array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-block-editor', 'wp-i18n' ),
			TAPTOP_VERSION,
			true
		);

		wp_enqueue_style(
			'taptop-block-editor',
			TAPTOP_PLUGIN_URL . 'assets/css/taptop-block.css',
			array( 'wp-edit-blocks' ),
			TAPTOP_VERSION
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'taptop-block-editor', 'tap-top' );
		}
	}

	public function render_block( $attributes, $content = '' ) {
		self::$has_blocks_on_page = true;
		
		$global_options = get_option( 'taptop_options', array() );
		if ( empty( $global_options['enabled'] ) ) {
			return '<!-- TapTop Block: Plugin disabled globally -->';
		}
		
		$display_mode = isset( $global_options['display_mode'] ) ? $global_options['display_mode'] : 'global';
		
		wp_enqueue_script( 'taptop', TAPTOP_PLUGIN_URL . 'assets/js/taptop.js', array(), TAPTOP_VERSION, true );
		wp_enqueue_style( 'taptop', TAPTOP_PLUGIN_URL . 'assets/css/taptop.css', array(), TAPTOP_VERSION );
		
		$config = wp_parse_args( $attributes, array(
			'enabled' => true,
			'position' => 'right',
			'size' => 48,
			'bgColor' => '#111111',
			'iconColor' => '#ffffff',
			'showProgress' => false,
			'progressColor' => '#007cba',
			'progressWidth' => 3,
			'progressBgColor' => 'rgba(255,255,255,0.2)',
			'showAfter' => 200,
			'offsetBottom' => 24,
			'offsetSide' => 24,
			'buttonShape' => 'circle',
			'animationStyle' => 'fade',
			'hideOnScrollDown' => false,
		) );
		
		if ( empty( $config['enabled'] ) ) {
			return '<!-- TapTop Block: Block disabled -->';
		}

		$config['size'] = max( 24, min( 80, intval( $config['size'] ) ) );
		$config['showAfter'] = max( 0, intval( $config['showAfter'] ) );
		$config['offsetBottom'] = max( 8, min( 100, intval( $config['offsetBottom'] ) ) );
		$config['offsetSide'] = max( 8, min( 100, intval( $config['offsetSide'] ) ) );
		$config['progressWidth'] = max( 1, min( 10, intval( $config['progressWidth'] ) ) );

		self::$block_instances++;
		$block_id = 'taptop-block-' . self::$block_instances;

		$adaptive_positioning = isset( $global_options['adaptive_positioning'] ) ? $global_options['adaptive_positioning'] : 1;

		$js_config = array(
			'blockId' => $block_id,
			'position' => $config['position'],
			'size' => $config['size'],
			'showAfter' => $config['showAfter'],
			'offsetBottom' => $config['offsetBottom'],
			'offsetSide' => $config['offsetSide'],
			'bgColor' => $config['bgColor'],
			'iconColor' => $config['iconColor'],
			'ariaLabel' => __( 'Back to top', 'tap-top' ),
			'showProgress' => (int) $config['showProgress'],
			'progressColor' => $config['progressColor'],
			'progressWidth' => $config['progressWidth'],
			'progressBgColor' => $config['progressBgColor'],
			'adaptivePositioning' => (int) $adaptive_positioning,
			'buttonShape' => $config['buttonShape'],
			'animationStyle' => $config['animationStyle'],
			'hideOnScrollDown' => (int) $config['hideOnScrollDown'],
		);

		if ( $display_mode === 'blocks_only' || $display_mode === 'hybrid' ) {
			self::$block_configs[] = $js_config;
		}

		return sprintf( '<!-- TapTop Block ID: %s -->', esc_html( $block_id ) );
	}

	public function output_block_configs() {
		if ( empty( self::$block_configs ) ) {
			return;
		}

		if ( ! wp_script_is( 'taptop', 'enqueued' ) ) {
			wp_enqueue_script( 'taptop', TAPTOP_PLUGIN_URL . 'assets/js/taptop.js', array(), TAPTOP_VERSION, true );
		}

		$inline_script = 'window.TapTopBlocks = window.TapTopBlocks || [];';
		foreach ( self::$block_configs as $config ) {
			$inline_script .= 'window.TapTopBlocks.push(' . wp_json_encode( $config ) . ');';
		}

		wp_add_inline_script( 'taptop', $inline_script, 'before' );
	}
}

new TapTop_Block();