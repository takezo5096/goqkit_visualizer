# GoQKit Visualizer
GoQKit Visualizer is a tool which help you visualize a quantium circuit and qbit's states when you build and run your GoQKit's program.

![image](https://user-images.githubusercontent.com/21256885/106553011-d1219380-655b-11eb-8342-2a8a8c496dfe.png)

## Quick start
```bash
> git clone https://github.com/takezo5096/goqkit_visualizer.git
> cd goqkit_visualizer
> go run main.go
```
and head over http://localhost:8888/ in your browser.
You can see the quantum circuit and qbits image which was created as Demo.

## Visualizing your GoQKit results
GoQKit Visualizer is a kinds of a tiny HTTP and WebSocket server. 
It loads a json file which is located at a current directory which GoQKit Visualizer command process is running in your PC's local storage.
This json file has to be written by GoQKit using FileDumpAll() of GoQKit 
and include all information about operations to qbits, and it's name must be goqkit.json.
This server is watching it every single second and check it modified.
If it was modified, this server would send it to your browser.
You don't have to reload it on your browser to display new one.

Instead of Demo, all you can do to see your own result is that you put your json file into a directory as I mentioned before.
In other words, replace or overwrite goqkit.json. That's it. See a sample code as bellow.
```golang
circuit := goqkit.MakeQBitsCircuit(3)
/*
    Do something here
 */
circuit.FileDumpAll("[your path]/goqkit_visualizer/goqkit.json")
```

Enjoy creating a quantum circuit !

## See also
GoQKit Visualizer is just a tool for visualizing GoQKit's result.
You might have to know GoQKit more. See details of [GoQKit](https://github.com/takezo5096/goqkit).

## License
**MIT License**

## Author
https://github.com/takezo5096