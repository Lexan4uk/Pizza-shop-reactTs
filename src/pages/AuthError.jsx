import '@styles/pages/AuthError.scss';



function AuthError() {

    return (
        <>
            <main className="autherr">
                <div className="autherr__content-holder block-normalizer">
                    <div className="autherr__content f-column gap-16">
                        <h1 class="autherr__title">Вы не авторизованы</h1>
                        <a href="/" className="button-l footer__auth-btn">На главную</a>
                    </div>
                </div>
            </main>
        </>
    )
}
export default AuthError;