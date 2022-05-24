export default function stringAvatar(name) {
    if (name.person[0]) {
        return {
            children: `${name.person[0].firstname[0]}${name.person[0].lastname[0]}`
        }
    }
    else {
        return {
            children: 'NYT'
        }
    }
}