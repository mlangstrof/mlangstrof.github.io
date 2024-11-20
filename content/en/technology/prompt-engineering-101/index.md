+++
title = 'Prompt Engineering 101'
date = 2024-11-19T21:00:03+08:00
draft = false
categories = ["technology"]
featuredImage = "/images/prompt_engineering_101.webp"
tags = ["ai","copilot","basics"]


+++

The past years heralded the advent of the age of AI and though some scepticism is certainly justified, there’s no denying that many of these tools have proven to be incredibly useful. Among the most practical applications are AI-powered chatbots, such as ChatGPT, Bing/Copilot, Gemini, and Grok. These bots excel at processing natural language queries (like *"What temperature should I cook my steak at?"*), leveraging generative AI models to craft responses, and delivering answers in a variety of formats—text, tables, images, and more.

At first glance, using these chatbots may seem effortless, but it doesn’t take long to encounter their limitations. These challenges are often less about the bots themselves (although issues like *hallucinations* can occur) and more about the user's ability to clearly and effectively express their queries. Complex questions or tasks, in particular, often require carefully structured prompts to yield meaningful results.

This need for clarity and precision in interacting with AI has given rise to a new field known as **prompt engineering**, dedicated to crafting and optimizing prompts for better outcomes. By mastering this skill, users can unlock the full potential of these powerful tools and achieve far more nuanced and accurate results.
# Basics
A **prompt** is a **message** you send to the AI chatbot containing **instructions**. This can be (and usually is) text based, but most major bots also support voice or other interfaces. Once a prompt is issued, the chatbot will calculate and return an answer (the **response**) and you can then reply once more. This is called the **conversation**.

## Prompt elements
Prompts can be deconstructed into different elements, below you can find a (non-exhaustive) list of common prompt elements:
- **Role**: Instruction to act in a certain role, e.g. *"Act as if you are an ambassador. Write a formal apology letter to my cat, because I fed it 5 minutes too late"*
- **Task**: Instruction to perform a specific task, e.g. *"Convert 50 inch to meters"*
- **Style or Tone**: Instruction to provide the response in a certain tone, e.g. *"Write in a formal and professional tone"*
- **Context**: Background information relevant to the task, e.g. *"I'm logged onto an Ubuntu server using SSH and need to find all files beginning with 'test'"*
- **Constraints**: Limitations or rules the AI must follow, e.g. *"Use only data from 2020 or newer"*
- **Input Language**: Language in which the prompt is formulated. While most chatbots support multiple languages, keep in mind in which language of the data it was trained with. You might get different answers (e.g. recipes) about "German pastries" when asking in German or English
- **Input Data**: Any information, examples or data you feed into the model with your prompt, e.g. *"I really like oranges and apples but don't care for melons"*
- **Output Format**: Instruction on how the response should be structured, e.g. *"What are the ten most popular fruits and seasonal availability. Provide the result as a table"*
- **Output Language**: Instruction on which language the response should be returned in, e.g. *"Write me a short story about a fox in a forest. The story should be in German"*
- **Explaining**: Instruction to explain how the response was generated (i.e. reasoning), e.g. *"What was the biggest factor that enabled modern computers. Explain your reasoning"*
- **Steps**: Instruction to split the response into multiple steps. You can also define that the prompt waits for your feedback after every prompt, e.g. *"I want to write a book about poodles. Generate me a structure with ten chapters, after you have generated a chapter, wait for my feedback before continuing. After all chapters are generated, create a synopsis"*

## Things to keep in mind
- different chatbots (or models) behave differently, each of them has its quirks, so the same prompt may get different responses. **Each bot has its own strength and weaknesses** and thus different use cases it is suitable for
- consider the **model's data source** (some models have access to unique data sets, for example Gemini to reddit) as it has huge implications for its answers
- **trial and error** are important to understand the model and develop an understanding of what works and what doesn't
- the same query can get a much different answer depending on the **context and length** of the conversation
- models can be differentiated by how many **parameters** they support (e.g. LAMA 7B supports 7 billion parameters). Simplified, the more parameters a model supports, the more complex, capable and mature it likely is
- have a clear **vision** of what information you would like the AI chatbot to provide you. For example consider you are asking for health information (which I would not advise anyone to ever do on the internet...). If you ask *"What energy stone should I use for my back pain"* or *"What should I use for my back pain"*, the answers will be very, *very* different. Or *"Give me the best authentic italian pizza recipe"* and *"Give me the best authentic italian pizza recipe using only sources written in Italian from websites with a .it domain"*. Consider what data set the chatbot will likely use to answer your query and adapt accordingly. Most datasets have a bias for popular websites
- Use *"Let's think step by step"* when the chatbot fails to give you a correct answer to a complex question or scenario. This will break up the chatbot's answer, with each answer building on the previous and allows the bot to answer step by step
- learn to recognize a **dead end** - sometimes the chatbot does not give you the information you are looking for, but the conversations has been going so long, that he will inevitably iterate through the same, tired (and wrong) answers. When you are this deep in, cut your losses and try again from a clean slate and this time try to experiment with the context to avoid guiding the chatbot into the same answers as before

# Prompt Engineering Best Practices

## Beware of context
**Consider that your previous prompts within the conversation establish a context**. Don't ask questions about completely different topics in the same conversation, as the chatbot will be primed based on the previous prompts and may take a wrong context when answering Use the context to your advantage and set it up deliberately as a first step when formulating complex or longer queries. Make sure to always keep instructions and context seperated

## Keep up with developments
Keep up to date with model versions and changes between versions. In general try to use the latest models (at least the general available / stable versions), as these will be best trained and contain the most features.

## Write like a news anchor
Make sure the statements in your prompt are **precise, concise and clear**. Don't use slang, acronyms (unless you set a clear context before) or ambiguous language. Also define your expected output (i.e. text, a list, a table, an image, etc.).

## Use examples and cues
Examples can be helpful in setting a context or getting a desired output. This can be as simple as *"generate me a list of ten wine aromas, like red fruits, black fruits, leather"*, where the AI will probably give you a list containing these entries and then listing adjacent ones.

Using cues is another tool to tweak the output in line with your vision. For example instead of *"What cars are currently most popular in Switzerland?"* you could add cues like *"What cars are currently most popular in Switzerland? The top 5 most popular cars are: "* and the chatbot will try to return an answer following directly your *"The top 5 most popular cars are:"* prompt.

## Emphasize important aspects
You can make use of repetitions to put emphasis to certain parts or aspects of a prompt. In some cases even repeated prompts can work, if the AI initially answered negatively such as *"Unforunately the Company API does not allow this operation"* but this is wrong, a nudge like *"I know this is possible, please answer the question above"*, might help.

Also consider that - much like humans - the AI will value your latest prompts more than your earlier ones, so for example, don't overwrite behavior unless intended.


