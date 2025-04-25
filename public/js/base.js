function setDeleteClass()
{
    $('.delete').bind('click', function(event) {
        $('#confirm_modal_delete').data('id', $(this).data('id'));
        const modalConfirmDelete = new bootstrap.Modal('#modal_confirm_delete');
        modalConfirmDelete.show();
    });
}

function setDetailClass()
{
    $('.detail').bind('click', function(event) {
        let id = $(this).data('id');
        $.get("/detail/" + $(this).data('id'), function(data, status){
            $('#age').html('<b>' + data + '</b>');
            const myModalAlternative = new bootstrap.Modal('#modal_age');
            myModalAlternative.show();
            
        });
    });
}

function getList()
{
    $.get('/getList/' + $('.filter_name').val(), function(data, status){
        $('table').find('tbody').html(data);
        
        setDeleteClass();
        setDetailClass();
    });
}

$(document).ready(function() {
    const toastElList = document.querySelectorAll('.toast')
    const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, {}))

    setDetailClass()
    setDeleteClass();

    $('#confirm_modal_delete').bind('click', function(event) {
        $.post('/delete/' + $(this).data('id'), function(data, status) {
            if (data == 'success')
            {
                getList();

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
        getList();
    });
});

