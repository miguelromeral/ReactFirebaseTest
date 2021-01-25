import { Link } from 'react-router-dom'

function MessaageElement({id, content, showDetail}){

    return (
        <div>
            <h4>Message ({id})</h4>
            <div>
                Content: {content}
            </div>
            {showDetail && <Link to={`/messages/${id}`}>Show details</Link>}
        </div>
    )
}

export default MessaageElement