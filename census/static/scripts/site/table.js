define(['jquery', 'bootstrap', 'chroma', 'tablesorter', 'stickykit'],
  function($, bootstrap, chroma, tablesorter, stickykit) {
    var placeCount = placeCount || 260,
      colorSteps = ['#ff0000', '#edcf3b', '#7ab800'],
      colorScale = chroma.scale(colorSteps).domain([0, 100]),
      naString = 'n/a',
      $dataTable = $('.data-table'),
      $scoreDisplay = $('.score'),
      popover_tmpl = '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      tablesorterPlaceOptions = {
        sortList: [[1, 0]],
        headers: {
          2: {sorter: false},
          3: {sorter: false},
          4: {sorter: false},
          5: {sorter: false},
          6: {sorter: false},
          7: {sorter: false},
          8: {sorter: false},
          9: {sorter: false},
          10: {sorter: false},
          11: {sorter: false}
        }
      },
      tablesorterPlaceIndexOptions = {
        sortList: [[0, 0]],
        headers: {
          2: {sorter: false},
          3: {sorter: false},
          4: {sorter: false},
          5: {sorter: false},
          6: {sorter: false},
          7: {sorter: false},
          8: {sorter: false},
          9: {sorter: false},
          10: {sorter: false},
          11: {sorter: false}
        }
      },
      tablesorterDatasetOptions = {
        sortList: [[0, 0]],
        headers: {
          2: {sorter: false},
          3: {sorter: false}
        }
      },
      tablesorterSliceOptions = {
        sortList: [[1, 0]],
        headers: {
          2: {sorter: false},
          3: {sorter: false},
          5: {sorter: false}
        }
      },
      tablesorterSliceIndexOptions = {
        sortList: [[0, 0]],
        headers: {
          2: {sorter: false}
        }
      },
      tablesorterPlaceSliceOptions = {
        sortList: [[3, 1]],
        headers: {
          1: {sorter: false},
          2: {sorter: false},
          4: {sorter: false}
        }
      },
      tablesorterPlaceSliceIndexOptions = {
        sortList: [[2, 1]],
        headers: {
          1: {sorter: false}
        }
      },
      sortFlag = true;

    $('#places_overview_table').tablesorter(tablesorterPlaceOptions);
    $('#places_overview_table_index').tablesorter(tablesorterPlaceIndexOptions);
    $('#datasets_overview_table').tablesorter(tablesorterDatasetOptions);
    $('#slice-table').tablesorter(tablesorterSliceOptions);
    $('#slice-table-index').tablesorter(tablesorterSliceIndexOptions);
    $('#place-slice-table').tablesorter(tablesorterPlaceSliceOptions);
    $('#place-slice-table-index').tablesorter(tablesorterPlaceSliceIndexOptions);

    $('#datasets_overview_table thead').stick_in_parent();
    $('#slice-table thead').stick_in_parent();

    $('.content').on('click', '.sort_rank, .sort_place',
      function(e) {
        $('#places_overview_table, #places_overview_table_index').trigger('sorton',
          [[[$(e.target).hasClass('sort_place') / 1, sortFlag]]]);
        $('.headerSortDown').removeClass('headerSortDown');
        $('.headerSortUp').removeClass('headerSortUp');
        $(e.target).addClass((sortFlag) ? 'headerSortUp' : 'headerSortDown');
        sortFlag = !sortFlag;
      }
    );

    // Ensure .details and .submissions table rows appear under their
    // appropriate parent row, even after sorting.
    $('.slice-table').bind('sortEnd', function() {
      $('.slice-table .entry').each(function(i, el) {
        $('.slice-table .submission-' + el.id).insertAfter(el);
        $('.slice-table #detail-' + el.id).insertAfter(el);
      });

      $('.slice-table .submission').each(function(i, el) {
        $('.slice-table #detail-' + el.id).insertAfter(el);
      });
    });

    function filterTable(table, query) {
      if (query.length < 2) {
        return;
      }

      table.find('tbody tr').each(function(index, value) {
        if ($(this).data('name').toLowerCase().indexOf(query) === -1) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    }

    function setInteractions() {

      $("[data-toggle='tooltip']").tooltip({html: true});
      $('[data-toggle="popover"]').popover({
          trigger: 'click',
          'placement': 'bottom',
          'html': true,
          'show': true,
          'template': popover_tmpl,
          'container': 'body'
      });

      $('[data-toggle="popover"]').on('click', function() {
          $('[data-toggle="popover"]').not(this).popover('hide');
      });

      $('body').on('click', 'td.showpopover', function() {
          var $this = $(this);

          // check if the one clicked is now shown
          if ($this.data('popover').tip().hasClass('in')) {

              // if another was showing, hide it
              if ($visiblePopover) {
                  $visiblePopover.popover('hide');
              }

              // then store reference to current popover
              $visiblePopover = $this;

          } else { // if it was hidden, then nothing must be showing
              $visiblePopover = '';
          }
      });

      $('.filter-table').on('keyup', function() {
        var query = $(this).val().toLowerCase().replace(' ', '-')
          .replace(',', '');
        filterTable($dataTable, query);
      });

      $.each($scoreDisplay, function(index, el) {
        var score,
          $el = $(el);
        if ($el.data('score') === naString) {
          score = 0;
        } else {
          score = parseInt($el.data('score'), 10);
        }
        $el.css({
          'background-color': colorScale(score).hex(),
          'color': 'white'
        });
      });
    }

    function setColumnTHWidths() {
      $('thead th').each(function() {
        $(this).css('width', $(this).outerWidth());
      });
    }

    function initializeTable() {
      setInteractions();
      setColumnTHWidths();
    }

    return {
      init: initializeTable
    };
  });
