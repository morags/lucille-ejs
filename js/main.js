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