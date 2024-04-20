# Rotaeno B30 Calculator

A simple best30 calculator for Rotaeno

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