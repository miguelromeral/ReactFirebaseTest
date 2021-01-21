/**
 * Test Element. All GUI elements in here
 * @param {id} string Document Snapshot ID
 */
function Test({id, name, value}){

    return (
        <div>
            <h4>{id}</h4>
            <div>
                {name} ({value})
            </div>
        </div>
    )
}

export default Test