const modalIcon = document.querySelector('.modal-icon');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const bgImages = document.querySelectorAll('.background-choices img');

//点击设置，打开模态框
modalIcon.addEventListener('click', (event) => {
    modalIcon.classList.toggle('active');
    modal.classList.toggle('active');
    modalContent.classList.toggle('active');
    //阻止事件冒泡，避免点击图标时关闭模态框
    event.stopPropagation();
});
//点击关闭按钮，关闭模态框
modalClose.addEventListener('click', () => {
    closeModal();
});
//点击模态框外部，关闭模态框
modal.addEventListener('click', (event) => {
    if(event.target === modal) {
        closeModal();
    }
});
//关闭模态框的函数
function closeModal() {
    modal.classList.remove('active');
    modalContent.classList.remove('active');
    modalIcon.classList.remove('active');
}

//为每个背景图片添加点击事件
bgImages.forEach(img => {
    img.addEventListener('click', () => {
        const bgUrl = img.dataset.bg;
        setBackground(bgUrl);
        
        //更新选中状态
        bgImages.forEach(i => i.classList.remove('active'));
        img.classList.add('active');
        
        //点击后关闭模态框
        closeModal();
    });
});

//设置背景图片的函数
function setBackground(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}