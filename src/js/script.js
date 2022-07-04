"use strict";
document.addEventListener('DOMContentLoaded', () => {



    //slider



    (function() {


        const sliderInner = document.querySelector('.m-card__slider');
        const sliderOne = document.querySelector('.m-card__item');
        const sliderWidth = sliderOne.offsetWidth;
        const styleGap = parseInt(getComputedStyle(sliderInner).gap);
        const sliderAll = Array.from(document.querySelectorAll('.m-card__item'));
        const width = -styleGap + (sliderWidth + styleGap) * sliderAll.length
        let COUNT_SLIDER_ON_SITE = 4;
        if (window.screen.width < 1399) {
            COUNT_SLIDER_ON_SITE = 3;
        } else {
            COUNT_SLIDER_ON_SITE = 4;
        }

        sliderInner.style.width = width + "px";
        sliderInner.style.display = "flex";


        let scrollToPx = 0;
        sliderInner.addEventListener('wheel', (e) => {
            e.preventDefault();
            let buffScroll = 0;

            if (e.deltaY > 0) {
                buffScroll += (sliderWidth + styleGap);
            } else {
                buffScroll -= (sliderWidth + styleGap);
            }


            if (scrollToPx + buffScroll > 0) {

            } else if (scrollToPx + buffScroll < -((sliderAll.length - COUNT_SLIDER_ON_SITE) * (sliderWidth + styleGap))) {

            } else {
                scrollToPx += buffScroll;
            }





            sliderInner.style.transform = `translateX(${scrollToPx}px)`;


        })



    })();






    //accordion

    (function() {




        const btn = document.querySelectorAll('[data-acc="btn_close"]');


        btn.forEach(btn => {

            const wrap = btn.closest('[data-acc="wrap"]');
            const content = wrap.querySelector('[data-acc="content"]');
            const wrapHeight = content.scrollHeight;

            content.style.maxHeight = 0;


            btn.addEventListener('click', function(e) {

                const btn = e.target;
                const btnAtr = btn.getAttribute('data-acc')
                const btnName = btn.getAttribute('data-acc-name')



                if (btnAtr == "btn_close") {
                    btn.setAttribute('data-acc', 'btn_open')
                    content.style.maxHeight = wrapHeight + "px";

                    switch (btnName) {
                        case "plane":
                            btn.innerText = "Скрыть учебный план"
                            btn.classList.toggle('active');
                            break;
                        case "step":
                            btn.innerText = "Скрыть описание"
                            break;

                        default:
                            break;
                    }

                } else {
                    btn.setAttribute('data-acc', 'btn_close')
                    content.style.maxHeight = 0;
                    switch (btnName) {
                        case "plane":
                            btn.innerText = "Показать учебный план"
                            btn.classList.toggle('active');

                            const subBtn = document.querySelectorAll('[data-acc-name="step"]')
                            subBtn.forEach(item => {
                                const atr = item.getAttribute('data-acc')
                                if (atr == 'btn_open') {
                                    item.click();
                                }
                            })

                            break;
                        case "step":
                            btn.innerText = "Описание ступени"
                            break;

                        default:
                            break;
                    }
                }





            })



        });



    })();






    //accordion - Recomend

    (function() {
        const btnRecomend = document.querySelectorAll('.recomend__btn');

        btnRecomend.forEach(btn => {
            btn.addEventListener('click', () => {
                const content = btn.nextElementSibling
                const maxHeight = parseInt(getComputedStyle(content).maxHeight)

                if (maxHeight == 0) {
                    btnRecomend.forEach(btn => {
                        if (btn.classList.contains('active')) {
                            btn.classList.toggle('active');
                        }
                        btn.nextElementSibling.style.maxHeight = 0;
                    })

                    content.style.maxHeight = content.scrollHeight + 'px';
                    btn.classList.toggle('active')
                } else {
                    content.style.maxHeight = 0;
                    btn.classList.toggle('active')
                }

            })
        })

    })();



    //Phone-mask
    function maskPhone(selector, masked = '+7 (___) _______') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }

        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }

    }
    maskPhone('.form__phone');



    //modals && Form

    (function() {

        //modals

        const modalBtn = document.querySelectorAll("[data-modal-btn]")
        const overlay = document.querySelector(".main-modal__overlay")
        const modalWindowForm = document.querySelector("#modal-form")
        const modalWindowALL = document.querySelectorAll(".main-modal__window")
        const modalClose = document.querySelectorAll(".main-modal__close")

        modalClose.forEach(item => {
            item.addEventListener('click', modalOff);
        });

        modalBtn.forEach(btn => {

            btn.addEventListener("click", () => {
                modalOn(modalWindowForm);

            })

        })

        function modalOn(modal) {
            document.body.classList.add('active');
            overlay.classList.add('active');
            modal.classList.add('active');

            document.addEventListener('click', (e) => {
                if (e.target == overlay) {
                    modalOff();
                }
            })
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modalOff();
                }
            });


        }

        function modalOff() {
            document.body.classList.remove('active');
            overlay.classList.remove('active');
            modalWindowALL.forEach(modal => {
                modal.classList.remove('active');
            })



        }


        //form

        const form = document.querySelectorAll('form')
        const modalWindowTnh = document.querySelector("#modal-tnh")

        form.forEach(form => {

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                modalOff();
                modalOn(modalWindowTnh);

                form.reset();

                setTimeout(() => {
                    if (modalWindowTnh.classList.contains('active')) {
                        modalOff();
                    }

                }, 6000)




            })


        })
    })();



    // Плавный scroll

    (function() {


        const anchors = document.querySelectorAll('a[href*="#"]');
        for (let anchor of anchors) {
            anchor.addEventListener("click", function(e) {
                e.preventDefault();

                const blockID = anchor.getAttribute("href").substring(1);
                if (blockID) {
                    document.getElementById(blockID).scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                } else {
                    return false
                }
            });
        }


    })();











});