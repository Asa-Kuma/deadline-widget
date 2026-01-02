function calculateCountdown() {
    // --- 設定項目 ---
    const birthDate = new Date('1997-10-11T00:00:00');
    const lifeExpectancy = 81; // 寿命
    // ----------------

    const endDate = new Date(birthDate);
    endDate.setFullYear(birthDate.getFullYear() + lifeExpectancy);

    let now = new Date();

    // --- 年・月・日の順で計算 ---
    let yearsLeft = endDate.getFullYear() - now.getFullYear();
    let monthsLeft = endDate.getMonth() - now.getMonth();
    let daysLeft = endDate.getDate() - now.getDate();

    // 月の繰り下がり処理
    // 今の月の方が終わりの月より後の場合、または同じ月で今日の方が終わりの日より後の場合
    if (monthsLeft < 0 || (monthsLeft === 0 && daysLeft < 0)) {
        yearsLeft--;
        monthsLeft += 12;
    }

    // 日の繰り下がり処理
    if (daysLeft < 0) {
        // 1ヶ月前の月を取得し、その最終日を求めることで、正確な日数を加算
        monthsLeft--;
        const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        daysLeft += lastDayOfPreviousMonth;
    }
    
    // もし繰り下がりの結果、月がマイナスになったら年を調整
    if (monthsLeft < 0) {
        yearsLeft--;
        monthsLeft += 12;
    }
    // ---------------------------

    // 経過率の計算
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
