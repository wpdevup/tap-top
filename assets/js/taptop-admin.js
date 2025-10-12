jQuery(document).ready(function($) {
    'use strict';
    
    // Initialize color pickers
    $('.color-field').wpColorPicker();
    
    // Content selector functionality
    let searchTimeout;
    
    const searchInput = $('#taptop-content-search');
    const searchResults = $('.taptop-search-results');
    const excludedList = $('#taptop-excluded-list');
    const hiddenInput = $('#taptop-exclude-content-data');
    
    // Get current excluded content
    function getCurrentExcludes() {
        try {
            return JSON.parse(hiddenInput.val() || '[]');
        } catch(e) {
            return [];
        }
    }
    
    // Update hidden input
    function updateExcludeData() {
        const excludes = [];
        $('.taptop-excluded-item').each(function() {
            excludes.push({
                id: $(this).data('id'),
                title: $(this).find('.taptop-item-title').text(),
                type: $(this).data('type')
            });
        });
        hiddenInput.val(JSON.stringify(excludes));
    }
    
    // Search functionality
    searchInput.on('input', function() {
        const search = $(this).val().trim();
        
        clearTimeout(searchTimeout);
        
        if (search.length < 2) {
            searchResults.hide();
            return;
        }
        
        searchTimeout = setTimeout(function() {
            searchResults.show().html('<div class="taptop-search-loading">Searching...</div>');
            
            $.post(taptopAjax.ajaxurl, {
                action: 'taptop_search_content',
                search: search,
                nonce: taptopAjax.nonce
            }, function(response) {
                if (response.success && response.data.length > 0) {
                    let html = '';
                    const currentExcludes = getCurrentExcludes();
                    const excludedIds = currentExcludes.map(item => item.type + '_' + item.id);
                    
                    response.data.forEach(function(item) {
                        const itemKey = item.type + '_' + item.id;
                        if (excludedIds.indexOf(itemKey) === -1) {
                            const typeLabel = item.type === 'page' ? 'Page' : 'Post';
                            html += '<div class="taptop-search-item" data-id="' + item.id + '" data-type="' + item.type + '" data-title="' + item.title + '">';
                            html += '<span>' + item.title + '</span>';
                            html += '<span class="taptop-item-type">(' + typeLabel + ' #' + item.id + ')</span>';
                            html += '</div>';
                        }
                    });
                    
                    if (html) {
                        searchResults.html(html);
                    } else {
                        searchResults.html('<div class="taptop-no-results">All results already excluded</div>');
                    }
                } else {
                    searchResults.html('<div class="taptop-no-results">No results found</div>');
                }
            }).fail(function() {
                searchResults.html('<div class="taptop-no-results">Search failed</div>');
            });
        }, 300);
    });
    
    // Add item to exclude list
    $(document).on('click', '.taptop-search-item', function() {
        const id = $(this).data('id');
        const title = $(this).data('title');
        const type = $(this).data('type');
        const typeLabel = type === 'page' ? 'Page' : 'Post';
        
        const html = '<div class="taptop-excluded-item" data-id="' + id + '" data-type="' + type + '">' +
                    '<span class="taptop-item-title">' + title + '</span>' +
                    '<span class="taptop-item-type">(' + typeLabel + ' #' + id + ')</span>' +
                    '<button type="button" class="taptop-remove-item" title="Remove">&times;</button>' +
                    '</div>';
        
        excludedList.append(html);
        updateExcludeData();
        
        // Remove from search results
        $(this).remove();
        
        // Clear search
        searchInput.val('');
        searchResults.hide();
    });
    
    // Remove item from exclude list
    $(document).on('click', '.taptop-remove-item', function() {
        $(this).closest('.taptop-excluded-item').remove();
        updateExcludeData();
    });
    
    // Hide search results when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.taptop-search-container').length) {
            searchResults.hide();
        }
    });
    
    // Toggle global settings based on display mode
    function toggleGlobalSettings() {
        var mode = $("select[name='taptop_options[display_mode]']").val();
        if (mode === "blocks_only") {
            $(".taptop-global-only").hide();
        } else {
            $(".taptop-global-only").show();
        }
    }
    
    toggleGlobalSettings();
    $("select[name='taptop_options[display_mode]']").on("change", toggleGlobalSettings);
});