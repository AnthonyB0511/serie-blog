const router = require("express").Router();

const connection = require("../../database");

router.get("/getSeries", (req, res) => {
    const sql = "SELECT * from series";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });

});
router.get("/getOneSerie", (req, res) => {
    const id = req.query.id;
    console.log({ id });
    const sql = "SELECT * FROM series WHERE id= ?";
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.patch("/updateSerie", (req, res) => {
    const id = req.body.id;
    const like = req.body.liked === true ? "1" : "0";
    console.log({ like });
    const sql = "UPDATE series SET liked = ? WHERE id = ?";
    // "UPDATE series SET\`like`\ = ? WHERE id= ?"
    connection.query(sql, [like, id], (err, result) => {
        if (err) throw err;
        res.send(req.body);

    });
});
router.delete("/deleteSerie/:id", (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const sqlDelete = "DELETE FROM series WHERE id = ?";
    connection.query(sqlDelete, [id], (err, result) => {
        if (err) throw err;
    });
    res.sendStatus(200);
});

router.post("/insertSeries", (req, res) => {
    console.log(req.body);
    const { synopsis, year, poster, title } = req.body;
    const insertSql = "INSERT INTO series(title, imgBlob, year, content) VALUES(?,?,?,?)";
    connection.query(insertSql, [title, poster, year, synopsis], (err, result) => {
        if (err) throw err;
        let lastInsertId = result.lastInsertId;
        let sqlLastOne = "SELECT * FROM series WHERE id =?";
        connection.query(sqlLastOne, [lastInsertId], (err, result) => {
            res.send(JSON.stringify(result));
        });
    }
    );
});

router.get("/getFavoris", (req, res) => {
    const sql = "SELECT * from series WHERE liked = true";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

module.exports = router;