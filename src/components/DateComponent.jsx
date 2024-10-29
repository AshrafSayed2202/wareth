import useArabicDateFormatter from '../hooks/useArabicDateFormatter.js'
const DateComponent = ({ date, type }) => {
    const arabicDate = useArabicDateFormatter(date, type);
    return <span>{arabicDate}</span>;
};
export default DateComponent