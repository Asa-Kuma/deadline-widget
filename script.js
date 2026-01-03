function calculateCountdown() {
    // --- 設定項目 ---
    const birthYear = 1997;
    const birthMonth = 10; // 10月
    const birthDay = 11;
    const lifeExpectancy = 80; // ★寿命を80歳に修正
    // ----------------

    // --- 終焉予定日を計算 ---
    const endYear = birthYear + lifeExpectancy;
    // JavaScriptの月は0から始まるため、10月は「9」として指定
    const endDate = new Date(endYear, birthMonth - 1, birthDay);
    // ---------------------------------

    let now = new Date();

    // --- 年・月・日の順で計算 ---
    let yearsLeft = endDate.getFullYear() - now.getFullYear();
    let monthsLeft = endDate.getMonth() - now.getMonth();
    let daysLeft = endDate.getDate() - now.getDate();

    if (monthsLeft < 0 || (monthsLeft === 0 && daysLeft < 0)) {
        yearsLeft--;
        monthsLeft += 12;
    }

    if (daysLeft < 0) {
        monthsLeft--;
        const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        daysLeft += lastDayOfPreviousMonth;
    }
    
    if (monthsLeft < 0) {
        yearsLeft--;
        monthsLeft += 12;
    }

    // 経過率の計算
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const totalLifeInMs = endDate.getTime() - birthDate.getTime();
    const livedInMs = now.getTime() - birthDate.getTime();
    let percentageLived = (livedInMs / totalLifeInMs) * 100;
    percentageLived = Math.round(percentageLived * 10) / 10;

    // HTMLに反映
    document.getElementById('years').textContent = yearsLeft >= 0 ? yearsLeft : 0;
    document.getElementById('months').textContent = monthsLeft >= 0 ? monthsLeft : 0;
    document.getElementById('days').textContent = daysLeft >= 0 ? daysLeft : 0;
    document.getElementById('percentage').textContent = `${percentageLived.toFixed(1)}%`;
    document.getElementById('progress-bar').style.width = `${percentageLived}%`;
}

// ページが読み込まれたら計算を実行
calculateCountdown();
