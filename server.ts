import server from './src';

const port = 5000;
server.listen(port, () => {
    console.log(`server started on port ${port}`);
});