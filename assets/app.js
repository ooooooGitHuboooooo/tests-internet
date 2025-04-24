import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

$(document).ready(function() {
    const toastElList = document.querySelectorAll('.toast')
    const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, {}))

    $('.detail').bind('click', function(event) {
        let id = $(this).data('id');
        $.get("/detail/" + $(this).data('id'), function(data, status){
            $('#age').html(data);
            const myModalAlternative = new bootstrap.Modal('#modal_age');
            myModalAlternative.show();
            
        });
    });

    $('.delete').bind('click', function(event) {
        $('#confirm_modal_delete').data('id', $(this).data('id'));
        const modalConfirmDelete = new bootstrap.Modal('#modal_confirm_delete');
        modalConfirmDelete.show();
    });

    $('#confirm_modal_delete').bind('click', function(event) {
        $.post('/delete/' + $(this).data('id'), function(data, status) {
            if (data == 'success')
            {
                $.get('/getList/' + $('.filter_name').val(), function(data, status){
                    $('table').find('tbody').html(data);
                    $('.delete').bind('click', function(event) {
                        $('#confirm_modal_delete').data('id', $(this).data('id'));
                        const modalConfirmDelete = new bootstrap.Modal('#modal_confirm_delete');
                        modalConfirmDelete.show();
                    });
                    $('.detail').bind('click', function(event) {
                        let id = $(this).data('id');
                        $.get("/detail/" + $(this).data('id'), function(data, status){
                            $('#age').html(data);
                            const myModalAlternative = new bootstrap.Modal('#modal_age');
                            myModalAlternative.show();
                            
                        });
                    });
                });

                const toastDeleteConfirm = new bootstrap.Toast('#toast_delete_confirm')

                toastDeleteConfirm.show({
                    'animation': true,
                    'autohide': true,
                    'delay': 5000
                });
            }
        });    
    });

    $('.filter_name').on('keyup', function(event) {
        $.get('/getList/' + $(this).val(), function(data, status){
            $('table').find('tbody').html(data);
            $('.delete').bind('click', function(event) {
                $('#confirm_modal_delete').data('id', $(this).data('id'));
                const modalConfirmDelete = new bootstrap.Modal('#modal_confirm_delete');
                modalConfirmDelete.show();
            });
            $('.detail').bind('click', function(event) {
                let id = $(this).data('id');
                $.get("/detail/" + $(this).data('id'), function(data, status){
                    $('#age').html(data);
                    const myModalAlternative = new bootstrap.Modal('#modal_age');
                    myModalAlternative.show();
                    
                });
            });
        });
    });
});
