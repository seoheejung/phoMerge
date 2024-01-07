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

    // 파일 업로드
    for(let i=1; i<=4; i++) {
        $('#browse-btn' + i).on("click", function () {
            $('#real-input' + i).click();
        });

        $('#real-input' + i).on("change", function () {
            let files = $(this).prop('files');
            if (files.length != 0) {
                if (files[0].size > 7 * 1024 * 1024) { // 7MB
                    Toast.fire({
                        icon: 'warning',
                        title: '파일 크기가 너무 큽니다. 7MB 이하의 파일만 업로드 가능합니다.'
                    });
                    $(this).val(''); // 파일 선택 입력란 초기화
                    $('#browse-btn' + i).text("+");
                } else {
                    $('#browse-btn' + i).text("✔");
                }
            }
        });
    }
});
