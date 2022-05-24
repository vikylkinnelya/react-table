export default function relativeTime(fullDate) {

    const date = new Date(fullDate)
    const deltaDays = (date - Date.now()) / (1000 * 3600 * 24)
    const deltaDaysAbs = Math.abs(deltaDays)
    const formatter = new Intl.RelativeTimeFormat();
    if (Math.floor(deltaDaysAbs * 24) <= 0) {
        return formatter.format(Math.round(deltaDays * 24 * 60), 'minutes');
    } else if (Math.floor(deltaDaysAbs) <= 0) {
        return formatter.format(Math.round(deltaDays * 24), 'hours');
    }
    else if (deltaDaysAbs > 0 && deltaDays < 30) {
        return formatter.format(Math.round(deltaDays), 'days');
    } else if (deltaDaysAbs >= 30 && deltaDays < 365) {
        return formatter.format(Math.round(deltaDays / 30), 'months');
    } else if (deltaDaysAbs > 365) {
        return formatter.format(Math.round(deltaDays / 365), 'years');
    }
}