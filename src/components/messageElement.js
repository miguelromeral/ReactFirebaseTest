
function MessaageElement({id, content}){

    return (
        <div>
            <h4>Message ({id})</h4>
            <div>
                Content: {content}
            </div>
        </div>
    )
}

export default MessaageElement