import ReactMarkdown from 'react-markdown'

const ListItem = ({note}) => {
  return <div className="list_item">
    <ReactMarkdown>{note.text}</ReactMarkdown>
  </div>;
};
export default ListItem;
