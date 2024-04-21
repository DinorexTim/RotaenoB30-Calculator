# Rotaeno B30 Calculator

A simple best30 calculator for Rotaeno
<div  align="center">    
    <img src="./images/demo.gif" width = "60%" height = "calc(0.55*width)">
</div>

## Screenshots

![img](./images/screenshot1.png)
![img](./images/screenshot2.png)

## Prerequisite

1. Intsall [Node.js](https://nodejs.org)
2. Edit `userdata.json`, please enter your actual rating in the `rating` field.

```json
{
    "name": "user",
    "rating": 0.00,
    "info": [
  
    ]
}
```

3. Open PowerShell/Terminal, navigate to the current directory, and type `npm install` to install dependencies.
4. Simply enter `npm start` in PowerShell/Terminal to start.

## Update rating list

- Data sources: [https://wiki.rotaeno.cn/index.php?title=Template:Songlist.json&action=edit](https://wiki.rotaeno.cn/index.php?title=Template:Songlist.json&action=edit)
- To update, just paste [source code](https://wiki.rotaeno.cn/index.php?title=Template:Songlist.json&action=edit) on `songs.json` and relaunch the server

## Disclaimer

- Images in this projetct are from the Internet, only for developers to learn, share and exchange use and not for other purposes. All copyright of the original publisher.
