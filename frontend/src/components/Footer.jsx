const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <div class='footer'>
            <br />
            <em>&copy; {year} Luke Rabbitte</em>
        </div>
    )
}

export default Footer