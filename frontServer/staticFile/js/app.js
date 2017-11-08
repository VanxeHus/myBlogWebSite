import {view} from "../../view/renderView.js"
import {ajax} from "../../ajax/getData.js"

ajax.GetData("GET","/program",view.RenderArticle);
