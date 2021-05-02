const formatDate = (date) => {
    // format date to mm/dd/yyyy
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
};
  
export default formatDate;