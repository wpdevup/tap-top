<?php
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) { exit; }
delete_option( 'taptop_options' );
if ( function_exists('is_multisite') && is_multisite() ) { delete_site_option( 'taptop_options' ); }
