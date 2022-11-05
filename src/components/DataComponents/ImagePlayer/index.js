export async function getImagePlayer(id) {
    const response = await fetch(`https://futdb.app/api/players/${id}/image`, {
        headers: {
            'Content-Type': 'image/png',
            "x-auth-token": '4c79e552-34cb-44cc-bcc7-518299c8e98a'
        }
    })
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
}