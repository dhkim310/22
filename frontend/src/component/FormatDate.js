function FormatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        // 오늘 날짜인 경우, 시간만 표시
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        // 다른 경우, 날짜와 시간 모두 표시
        return date.toLocaleString();
    }
}

export { FormatDate }; // 함수를 내보냅니다.