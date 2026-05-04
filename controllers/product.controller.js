const db = require('../models/db');
const fs = require('fs');
const path = require('path');

exports.getDashboard = async (req, res) => {
    try {
        let query = 'SELECT * FROM products ORDER BY id DESC';
        let queryParams = [];
        if (req.query.search) {
            query = 'SELECT * FROM products WHERE name LIKE ? ORDER BY id DESC';
            queryParams = [`%${req.query.search}%`]; 
        }
        const [products] = await db.query(query, queryParams);
        res.render('index', { 
            products: products, 
            searchQuery: req.query.search || '' 
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getAddForm = (req, res) => {
    res.render('form', { product: null });
};

exports.addProduct = async (req, res) => {
    const { name, category, price, stock } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        await db.query('INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)', 
        [name, category, price, stock, image]);
        res.redirect('/?status=added');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getEditForm = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.render('form', { product: rows[0] });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateProduct = async (req, res) => {
    const { name, category, price, stock, old_image } = req.body;
    let image = old_image;

    try {
        if (req.file) {
            image = req.file.filename;
            if (old_image) {
                const oldImagePath = path.join(__dirname, '../uploads', old_image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }
        await db.query('UPDATE products SET name=?, category=?, price=?, stock=?, image=? WHERE id=?', 
        [name, category, price, stock, image, req.params.id]);
        res.redirect('/?status=updated');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT image FROM products WHERE id = ?', [req.params.id]);
        if (rows.length > 0 && rows[0].image) {
            const imgPath = path.join(__dirname, '../uploads', rows[0].image);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }
        await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.redirect('/?status=deleted');
    } catch (err) {
        res.status(500).send(err);
    }
};