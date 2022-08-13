 // DB
var db = new PouchDB('todos');

db.info(function(err,info){
    db.changes({
        since: info.update_seq,
        live: true
    }).on('change', showTodos)
});

  
function addTodo(text) {
    let todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };

    db.put(todo, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });
}

function showTodos() {
    db.allDocs({include_docs: true, descending: true}).then(function(doc){
      redrawTodosUI(doc.rows);
    }).catch(function(err) {
        console.log(err);
    });
}

async function getAll() {
    try {
        let res = await db.allDocs({
            include_docs: true,
            attachments: true
        });
        let titles = [];
        res.rows.forEach((d) => { titles.push(d.doc.title) });
        return titles;
    } catch (err) {
        console.log(err);
    }
}

