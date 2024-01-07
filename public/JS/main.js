$().ready(function () {
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

    $('#upload-form').on('submit', function(e) {
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

    // 파일 업로드1
    $('#browse-btn1').on("click", function () {
        $('#real-input1').click();
    });

    $('#real-input1').on("change", function () {
        let files = $(this).prop('files');
        if (files.length != 0) {
            $('#browse-btn1').text("✔");
        }
    });

    // 파일 업로드2
    $('#browse-btn2').on("click", function () {
        $('#real-input2').click();
    });

    $('#real-input2').on("change", function () {
        $(this).next('.error-message').hide();
        let files = $(this).prop('files');
        if (files.length != 0) {
            $('#browse-btn2').text("✔");
        }
    });

    // 파일 업로드3
    $('#browse-btn3').on("click", function () {
        $('#real-input3').click();
    });

    $('#real-input3').on("change", function () {
        let files = $(this).prop('files');
        if (files.length != 0) {
            $('#browse-btn3').text("✔");
        }
    });

    // 파일 업로드4
    $('#browse-btn4').on("click", function () {
        $('#real-input4').click();
    });

    $('#real-input4').on("change", function () {
        let files = $(this).prop('files');
        if (files.length != 0) {
            $('#browse-btn4').text("✔");
        }
    });

});
