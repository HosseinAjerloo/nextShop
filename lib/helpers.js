export const toPersian=(date)=>{
    let dateTime=null;
    let persianData=null
    if (!date)
    {

        dateTime=new Date();
    }

    persianData=new Intl.DateTimeFormat('fa-IR-u-nu-latn',{
        hour:'2-digit',
        minute:'2-digit',
        year:'numeric',
        month:'2-digit',
        day:'2-digit',

        hour12:false
    }).format(dateTime);
    persianData=persianData.split(',');
    persianData=persianData[1]+' '+persianData[0];
    return persianData
}