import Groq from "groq-sdk";
import appInfo from "@/data/appInfo.json"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompt = `Tu es un assistant virtuel d'une application de location
    de logements en lancement à Brazzaville (Congo), chargé de répondre clairement 
    aux questions des utilisateurs, uniquement à partir des informations de la FAQ sans
    jamais inventer ou compléter des données, indiquer que les logements ne sont pas encore 
    disponibles si la question porte dessus, signaler clairement quand une information est 
    indisponible, de les rassurer, de leur donner envie d'utiliser l'application et de les encourager à 
    revenir lors du lancement, en respectant un ton simple et professionnel avec un usage
    modéré d'emojis (🏠🚀),tu dois vouvoyer les clients.Tu dois répondre aux clients sans jamais mentionner la présence du FAQs.
    Tu dois répondre uniquement aux questions liées à l'application, refuser toute question hors sujet
    en indiquant que tu ne peux répondre qu'aux questions concernant l'application.


    Voici toutes les informations officielles:
    ${JSON.stringify(appInfo,null,2)}
`

export async function POST(req: Request) {
    try {
        const {message} = await req.json()

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: message
                }
            ]
        })

        console.log("Message de Groq: ", completion)

        return Response.json({
            response: completion.choices[0]?.message?.content || ""
        })
    } catch (err) {
        console.error("Erreur Groq: ", err)
        return Response.json(
            {error: String(err)},
            {status: 500}
        )
    }
  
}

