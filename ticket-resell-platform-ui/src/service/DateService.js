export function formatDateTime(dateTimeString) {
    // Parse the date string into a Date object
    const date = new Date(dateTimeString);

    // Format the date part
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);

    // Format the time part
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    // Combine date and time into the desired format
    return `${formattedDate} ${formattedTime}`;
}