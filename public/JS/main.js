$(document).ready(() => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'center-center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    $('#upload-form').on('submit', (e) => {
        let inputValues = [$('#real-input1').val(), $('#real-input2').val(), $('#real-input3').val(), $('#real-input4').val()];
        let nonEmptyValues = inputValues.filter(function(value) {
            return value !== '';
        });
        if (nonEmptyValues.length < 2) {
            // 최소 2장의 사진이 선택되지 않았다면 폼 제출 방지
            e.preventDefault(); 
            Toast.fire({
                icon: 'warning',
                title: '사진은 최소 2장이 필요합니다.'
            })
        }
    });

    // 파일 업로드 리팩토링
    for(let i=1; i<=4; i++) {
        $('#browse-btn' + i).on("click", function () {
            $('#real-input' + i).click();
        });

        $('#real-input' + i).on("change", function () {
            let files = $(this).prop('files');
            if (files.length != 0) {
                $('#browse-btn' + i).text("✔");
            }
        });
    }


});
