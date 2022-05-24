export default function datePrettier(dateUnpretty) {
    const date = new Date(dateUnpretty)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate()
    return [day, month, year].join(' ')
}