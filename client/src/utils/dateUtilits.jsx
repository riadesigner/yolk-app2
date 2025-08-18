

export const formatDate = (isoDate) => {        
    const date = new Date(isoDate);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };      
    return date.toLocaleDateString('ru-RU', options);
};

export const formatDateTime = (isoDate)=>{        
    const date = new Date(isoDate);
    const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
    };        
    const humanReadable = date.toLocaleString('ru-RU', options);
    return humanReadable;
}

