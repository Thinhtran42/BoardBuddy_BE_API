const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)

    return {
        formatDate: date.toString(),
        iosDate: date.toISOString(),
    }
}

export default formatTimestamp