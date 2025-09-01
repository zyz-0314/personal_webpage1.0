function updateDate() {
    const dateElement = document.getElementById("current-date");
    const now = new Date();
    const weekOptions = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const week = weekOptions[now.getDay()];
    dateElement.textContent = `${year}年${month}月${day}日 ${week}`; //修改页面结构，在网页上呈现日期
}
updateDate();
setInterval(updateDate, 1000*60*60); //每小时更新一次日期

function updateTime() {
    const timeElement = document.getElementById("real-time");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');
    const timeString = [hours, minutes, seconds].join(':');
    timeElement.textContent = timeString; //修改页面结构，在网页上呈现时间
}
updateTime(); //首次加载页面时更新时间
setInterval(updateTime, 1000); //每隔1秒更新一次

//禁止通过F12检查代码
document.addEventListener('keydown', function(event) {
    if(event.key == 'F12') {
        event.preventDefault();
        alert("你想检查什么？");
        console.log("发现点击F12，撤回一次检查申请");
    }
})

//获取当前时间的问候语
function getGreetingByHour(hour) {
    if(hour>=5 && hour<9) {
        return "早上好";
    }
    if(hour>=9 && hour<11) {
        return "上午好";
    }
    if(hour>=11 && hour<13) {
        return "中午好";
    }
    if(hour>=13 && hour<18) {
        return "下午好";
    }
    if(hour>=18 && hour<23) {
        return "晚上好";
    }
    return "夜深了";
}
function updateGreetingTime() {
    const now = new Date();
    const hour = now.getHours();
    document.querySelector('.greeting-time').textContent = getGreetingByHour(hour);   
}
updateGreetingTime();
setInterval(updateGreetingTime, 60000); //每分钟更新一次问候语


//添加等待DOM加载完成的监听器
document.addEventListener('DOMContentLoaded', function() {

    function updateWeather() {
        const weatherElement = document.querySelector('.current-weather');
        if (!weatherElement) {
            console.error('天气显示元素未找到');
            return;
        }

        weatherElement.textContent = "获取天气中...";

        //获取位置和天气的主函数
        function getLocationAndWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        fetchLocationData(lon, lat);
                    },
                    error => {
                        console.error('位置获取失败:', error);
                        //使用默认位置（北京）作为回退
                        fetchWeatherData("110000"); 
                    },
                    { timeout: 5000 } //5秒超时
                );
            }
            else {
                console.error("浏览器不支持地理位置");
                fetchWeatherData("110000"); //使用默认位置
            }
        }

        //通过坐标获取位置信息
        function fetchLocationData(lon, lat) {
            fetch(`https://restapi.amap.com/v3/geocode/regeo?location=${lon},${lat}&key=a82f140b9a4b01f60079f4fd86961b98`)
                .then(response => {
                    if (!response.ok) throw new Error('网络响应异常');
                    return response.json();
                })
                .then(data => {
                    if (data.status === "1" && data.regeocode) {
                        const adcode = data.regeocode.addressComponent.adcode;
                        fetchWeatherData(adcode);
                    } else {
                        throw new Error(`位置API错误: ${data.info}`);
                    }
                })
                .catch(error => {
                    console.error('位置获取失败:', error);
                    fetchWeatherData("110000"); //回退到默认位置
                });
        }

        //获取天气数据
        function fetchWeatherData(adcode) {
            const key = "a82f140b9a4b01f60079f4fd86961b98";
            fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${adcode}&output=json&extensions=base`)
                .then(response => {
                    if (!response.ok) throw new Error('天气请求失败');
                    return response.json();
                })
                .then(data => {
                    if (data.status === "1" && data.lives?.length > 0) {
                        const info = data.lives[0];
                        weatherElement.textContent = 
                            `${info.city} ${info.weather} ${info.temperature}℃`;
                    } else {
                        throw new Error(`天气API错误: ${data.info}`);
                    }
                })
                .catch(error => {
                    console.error('天气获取失败:', error);
                    weatherElement.textContent = "（天气信息不可用）";
                });
        }

        //初始化调用
        getLocationAndWeather();
    }

    //调用天气函数
    updateWeather();
});

