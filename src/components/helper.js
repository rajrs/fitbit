
 
 export const DateFormat = (date)=> {
     console.log(date)
    /* complete date format
    https://elijahmanor.com/blog/format-js-dates-and-times */
            let inpDate= new Date(date);     
            //inpDate.getDate()+'-'+ inpDate.getMonth()+'-'+inpDate.getFullYear() 
            return  inpDate.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}) ;
        }  