import style from './GetOffer.module.css'

const GetOffer = () => {
    return ( 
            <div className={style.getOffer}>
                <div id={style.subscription_area}>
                <div className="container">
                    <div className="row">
                    <div className="col-sm-12">
                        <div className={style.subscribe_now}>
                        <h4>Get Offer</h4>
                        <p>Get your own Offer</p>
                        <form className={style.subscribe_form}>
                            <div className={style.input_group}>
                            <input type="text" className={style.form_control} name="email" placeholder="Enter your email"/>
                            <span className={style.input_group_btn}>
                                    <button className="btn btn-default" type="button">Send</button>
                            </span>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
     );
}
 
export default GetOffer;