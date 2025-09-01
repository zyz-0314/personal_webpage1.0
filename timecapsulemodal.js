// 计算时间进度
function updateTimeProgress() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const todayPassed = hours + minutes/60 + seconds/3600;
    const todayRemain = 24 - todayPassed;
    const todayPercent = (todayPassed/24*100).toFixed(2);
    
    //今日进度
    document.getElementById('today-passed-hours').textContent = Math.floor(todayPassed);
    document.getElementById('total-remain-hours').textContent = Math.ceil(todayRemain);
    document.getElementById('day-progress').value = todayPercent;
    //添加百分比显示元素
    let dayPercentEl = document.getElementById('day-progress').nextElementSibling;
    if (!dayPercentEl || !dayPercentEl.classList.contains('progress-percent')) {
        dayPercentEl = document.createElement('span');
        dayPercentEl.className = 'progress-percent';
        document.getElementById('day-progress').parentNode.insertBefore(dayPercentEl, document.getElementById('day-progress').nextSibling);
    }
    dayPercentEl.textContent = todayPercent + "%";

    //本周进度
    const weekDay = now.getDay() === 0 ? 7 : now.getDay();
    const weekPassed = (weekDay - 1) + todayPassed / 24;
    const weekRemain = 7 - weekPassed;
    const weekPercent = (weekPassed / 7 * 100).toFixed(2);
    document.getElementById("week-passed-hours").textContent = Math.floor(weekPassed * 24);
    document.getElementById("week-remain-hours").textContent = Math.ceil(weekRemain * 24);
    document.getElementById("week-progress").value = weekPercent;
    let weekPercentEl = document.getElementById('week-progress').nextElementSibling;
    if (!weekPercentEl || !weekPercentEl.classList.contains('progress-percent')) {
        weekPercentEl = document.createElement('span');
        weekPercentEl.className = 'progress-percent';
        document.getElementById('week-progress').parentNode.insertBefore(weekPercentEl, document.getElementById('week-progress').nextSibling);
    }
    weekPercentEl.textContent = weekPercent + "%";

    //本月进度
    const monthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const monthPassed = (now.getDate() - 1) + todayPassed / 24;
    const monthRemain = monthDays - monthPassed;
    const monthPercent = (monthPassed / monthDays * 100).toFixed(2);
    document.getElementById("month-passed-hours").textContent = Math.floor(monthPassed * 24);
    document.getElementById("month-remain-hours").textContent = Math.ceil(monthRemain * 24);
    document.getElementById("month-progress").value = monthPercent;
    let monthPercentEl = document.getElementById('month-progress').nextElementSibling;
    if (!monthPercentEl || !monthPercentEl.classList.contains('progress-percent')) {
        monthPercentEl = document.createElement('span');
        monthPercentEl.className = 'progress-percent';
        document.getElementById('month-progress').parentNode.insertBefore(monthPercentEl, document.getElementById('month-progress').nextSibling);
    }
    monthPercentEl.textContent = monthPercent + "%";

    //本年进度
    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const year = now.getFullYear();
    const yearDays = isLeapYear(year) ? 366 : 365; //直接通过闰年判断天数
    const startOfYear = new Date(year, 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    const yearPassed = (dayOfYear - 1) + todayPassed / 24;
    const yearRemain = yearDays - yearPassed;
    const yearPercent = (yearPassed / yearDays * 100).toFixed(2);
    document.getElementById("year-passed-hours").textContent = Math.floor(yearPassed * 24);
    document.getElementById("year-remain-hours").textContent = Math.ceil(yearRemain * 24);
    document.getElementById("year-progress").value = yearPercent;
    let yearPercentEl = document.getElementById('year-progress').nextElementSibling;
    if (!yearPercentEl || !yearPercentEl.classList.contains('progress-percent')) {
        yearPercentEl = document.createElement('span');
        yearPercentEl.className = 'progress-percent';
        document.getElementById('year-progress').parentNode.insertBefore(yearPercentEl, document.getElementById('year-progress').nextSibling);
    }
    yearPercentEl.textContent = yearPercent + "%";
}
updateTimeProgress();
setInterval(updateTimeProgress, 1000);


const capsuleIcon = document.querySelector('.time-capsule-icon');
const timeCapsule = document.querySelector('.time-capsule');
const timeCapsuleContent = document.querySelector('.time-capsule-content');
const timeCapsuleClose = document.querySelector('.time-capsule-close');

capsuleIcon.addEventListener('click', (event) => {
    capsuleIcon.classList.toggle('active');
    timeCapsule.classList.toggle('active');
    timeCapsuleContent.classList.toggle('active');
    event.stopPropagation();
});
timeCapsuleClose.addEventListener('click', () => closeModal2());
timeCapsule.addEventListener('click', (event) => {
    if (event.target === timeCapsule) closeModal2();
});
function closeModal2() {
    timeCapsule.classList.remove('active');
    timeCapsuleContent.classList.remove('active');
    capsuleIcon.classList.remove('active');
}