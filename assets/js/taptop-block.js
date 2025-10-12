// TapTop Block - Enhanced Version with Settings Panel
(function() {
    const { registerBlockType } = wp.blocks;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;
    const { 
        InspectorControls,
        ColorPalette,
        PanelColorSettings 
    } = wp.blockEditor || wp.editor;
    const { 
        PanelBody, 
        ToggleControl, 
        SelectControl, 
        RangeControl,
        ColorPicker,
        BaseControl
    } = wp.components;

    registerBlockType('taptop/button', {
        title: __('Tap Top Button', 'tap-top'),
        description: __('Add a customizable back-to-top button', 'tap-top'),
        icon: 'arrow-up-alt2',
        category: 'widgets',
        keywords: ['tap', 'top', 'button', 'scroll', 'back'],
        
        attributes: {
            enabled: {
                type: 'boolean',
                default: true
            },
            position: {
                type: 'string',
                default: 'right'
            },
            size: {
                type: 'number',
                default: 48
            },
            bgColor: {
                type: 'string',
                default: '#111111'
            },
            iconColor: {
                type: 'string',
                default: '#ffffff'
            },
            showProgress: {
                type: 'boolean',
                default: false
            },
            progressColor: {
                type: 'string',
                default: '#007cba'
            },
            progressWidth: {
                type: 'number',
                default: 3
            },
            progressBgColor: {
                type: 'string',
                default: 'rgba(255,255,255,0.2)'
            },
            showAfter: {
                type: 'number',
                default: 200
            },
            offsetBottom: {
                type: 'number',
                default: 24
            },
            offsetSide: {
                type: 'number',
                default: 24
            }
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                enabled,
                position,
                size,
                bgColor,
                iconColor,
                showProgress,
                progressColor,
                progressWidth,
                progressBgColor,
                showAfter,
                offsetBottom,
                offsetSide
            } = attributes;

            // Settings Panel (Inspector Controls)
            const inspectorControls = el(InspectorControls, {},
                // Display Settings
                el(PanelBody, {
                    title: __('Display Settings', 'tap-top'),
                    initialOpen: true
                },
                    el(ToggleControl, {
                        label: __('Enable Button', 'tap-top'),
                        checked: enabled,
                        onChange: (value) => setAttributes({ enabled: value })
                    }),
                    
                    el(SelectControl, {
                        label: __('Position', 'tap-top'),
                        value: position,
                        options: [
                            { label: __('Bottom Right', 'tap-top'), value: 'right' },
                            { label: __('Bottom Left', 'tap-top'), value: 'left' }
                        ],
                        onChange: (value) => setAttributes({ position: value })
                    }),
                    
                    el(RangeControl, {
                        label: __('Button Size (px)', 'tap-top'),
                        value: size,
                        onChange: (value) => setAttributes({ size: value }),
                        min: 24,
                        max: 80
                    }),
                    
                    el(RangeControl, {
                        label: __('Show After Scroll (px)', 'tap-top'),
                        value: showAfter,
                        onChange: (value) => setAttributes({ showAfter: value }),
                        min: 0,
                        max: 1000
                    })
                ),

                // Appearance Settings
                el(PanelBody, {
                    title: __('Appearance', 'tap-top'),
                    initialOpen: false
                },
                    el(BaseControl, {
                        label: __('Background Color', 'tap-top')
                    },
                        el(ColorPicker, {
                            color: bgColor,
                            onChangeComplete: (value) => setAttributes({ bgColor: value.hex })
                        })
                    ),
                    
                    el(BaseControl, {
                        label: __('Icon Color', 'tap-top')
                    },
                        el(ColorPicker, {
                            color: iconColor,
                            onChangeComplete: (value) => setAttributes({ iconColor: value.hex })
                        })
                    ),
                    
                    el(RangeControl, {
                        label: __('Bottom Offset (px)', 'tap-top'),
                        value: offsetBottom,
                        onChange: (value) => setAttributes({ offsetBottom: value }),
                        min: 8,
                        max: 100
                    }),
                    
                    el(RangeControl, {
                        label: __('Side Offset (px)', 'tap-top'),
                        value: offsetSide,
                        onChange: (value) => setAttributes({ offsetSide: value }),
                        min: 8,
                        max: 100
                    })
                ),

                // Progress Ring Settings
                el(PanelBody, {
                    title: __('Progress Ring', 'tap-top'),
                    initialOpen: false
                },
                    el(ToggleControl, {
                        label: __('Enable Progress Ring', 'tap-top'),
                        checked: showProgress,
                        onChange: (value) => setAttributes({ showProgress: value }),
                        help: __('Shows scroll progress around the button', 'tap-top')
                    }),
                    
                    showProgress && el(Fragment, {},
                        el(BaseControl, {
                            label: __('Progress Color', 'tap-top')
                        },
                            el(ColorPicker, {
                                color: progressColor,
                                onChangeComplete: (value) => setAttributes({ progressColor: value.hex })
                            })
                        ),
                        
                        el(RangeControl, {
                            label: __('Ring Width (px)', 'tap-top'),
                            value: progressWidth,
                            onChange: (value) => setAttributes({ progressWidth: value }),
                            min: 1,
                            max: 10
                        }),
                        
                        el(BaseControl, {
                            label: __('Ring Background Color', 'tap-top'),
                            help: __('Supports rgba colors', 'tap-top')
                        },
                            el('input', {
                                type: 'text',
                                value: progressBgColor,
                                onChange: (e) => setAttributes({ progressBgColor: e.target.value }),
                                placeholder: 'rgba(255,255,255,0.2)',
                                style: { width: '100%' }
                            })
                        )
                    )
                )
            );

            // Block Preview
            const blockPreview = el('div', {
                style: {
                    padding: '20px',
                    textAlign: 'center',
                    border: enabled ? '2px solid #007cba' : '2px dashed #ccc',
                    borderRadius: '8px',
                    backgroundColor: enabled ? '#f0f8ff' : '#f8f9fa',
                    position: 'relative'
                }
            }, [
                el('div', {
                    key: 'icon',
                    style: {
                        display: 'inline-block',
                        width: Math.round(size * 0.6) + 'px',
                        height: Math.round(size * 0.6) + 'px',
                        backgroundColor: bgColor,
                        borderRadius: '50%',
                        marginBottom: '8px',
                        position: 'relative'
                    }
                }, [
                    el('div', {
                        key: 'arrow',
                        style: {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderBottom: '8px solid ' + iconColor
                        }
                    })
                ]),
                el('h4', { 
                    key: 'title',
                    style: { margin: '0 0 4px 0', color: enabled ? '#007cba' : '#666' }
                }, __('Tap Top Button', 'tap-top')),
                el('p', { 
                    key: 'desc',
                    style: { margin: '0', fontSize: '14px', color: '#666' }
                }, enabled ? 
                    __('Button will appear on this page', 'tap-top') : 
                    __('Button is disabled', 'tap-top')
                ),
                el('div', {
                    key: 'settings',
                    style: { 
                        fontSize: '12px', 
                        color: '#999', 
                        marginTop: '8px',
                        fontStyle: 'italic'
                    }
                }, `${position === 'right' ? 'Right' : 'Left'} • ${size}px • ${showProgress ? 'Progress Ring' : 'No Ring'}`)
            ]);

            return el(Fragment, {},
                inspectorControls,
                blockPreview
            );
        },

        save: function() {
            return null; // Dynamic block - rendered by PHP
        }
    });
})();