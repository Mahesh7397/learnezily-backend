const express=require("express")
const Router=express.Router()
const AiController=require("../controler/Ai")

Router.route("/quiz")
.post(AiController.Ai_Gemini_model)

Router.route("/evaluate")
.post(AiController.Ai_Gemini_model_evaluation)

Router.route("/roadmap")
.post(AiController.Ai_Gemini_model_Roadmap)


Router.route("/deep-dive")
.post(AiController.Ai_Gemini_model_Deep_Diver)

Router.route("/chat")
.post(AiController.Ai_Gemini_model_Chat)


module.exports=Router