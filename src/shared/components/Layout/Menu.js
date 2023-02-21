import { Link } from "react-router-dom"

const Menu = ({item}) => {
    return (
        <div className="col-lg-12 col-md-12 col-sm-12">
            <nav>
                <div id="menu" className="collapse navbar-collapse">
                    <ul>
                        {
                            item.map((value, index)=>
                                <li className="menu-item"><Link to={`/category-${value._id}`}>{value.name}</Link></li>
                            )
                        }
                        

                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default Menu