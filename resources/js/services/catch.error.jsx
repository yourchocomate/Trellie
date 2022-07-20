export const logErr = (err) => {
    console.log(`status code: ${err.status}`);
    console.log(`server message: ${err.message}`);
    return err;
}