var directions = ["Top","Bottom","Left","Right"];

var opposite =
{ 
	"Top":"Bottom",
	"Bottom":"Top",
	"Left":"Right",
	"Right":"Left"
};

var initialise = function()
{
	var grid = document.body.appendChild(createGrid(16,16));
	grid.rows[0].cells[0].generate();
	grid.rows[0].cells[0].className="Start";
	
	var x = Math.floor(grid.rows[0].cells.length*Math.random());
	var y = Math.floor(grid.rows.length*Math.random());
	
	var current = grid.rows[y].cells[x];
	current.className="Slut";
	if (grid.rows == 0 && grid.cells == 0) {alert ("kage")}
	
	
	keyboard.pushListener("left",function(keynum)
	{
		if (current.getWallColor("Left")=="transparent")
		{
			current.className = "";
			current = current.getNeighbor("Left");
			current.className="Slut";
		}
	});	
	keyboard.pushListener("right",function(keynum)
	{
		if (current.getWallColor("Right")=="transparent")
		{
			current.className = "";
			current = current.getNeighbor("Right");
			current.className="Slut";
		}
	});
	keyboard.pushListener("up",function(keynum)
	{
		if (current.getWallColor("Top")=="transparent")
		{
			current.className = "";
			current = current.getNeighbor("Top");
			current.className="Slut";
		}
	});
	keyboard.pushListener("down",function(keynum)
	{
		if (current.getWallColor("Bottom")=="transparent")
		{
			current.className = "";
			current = current.getNeighbor("Bottom");
			current.className="Slut";
		}
	});	
}

var createGrid = function(cols,rows) 
{
	var grid = document.createElement("table");
	grid.className = "Grid";
	
	for (var y=0;y<rows;++y) 
	{
		var row = grid.appendChild(document.createElement("tr"));
		for (var x=0;x<cols;++x)
		{
			var cell = row.appendChild(document.createElement("td"));
			cell.getWallColor = function(direction)
			{
				var color = this.style["border"+direction+"Color"];
				if (color==undefined) color = "transparent";
				return color;
			}
			cell.setWallColor = function(direction,color)
			{
				this.style["border"+direction+"Color"] = color;
			}
			cell.getNeighbor = function(direction)
			{
				switch (direction) 
				{
					case "Left": return this.previousSibling; break;
					case "Right": return this.nextSibling; break;
					case "Top": 
						var p = this.parentNode.previousSibling;
						if (!p) return undefined;
						return p.cells[this.cellIndex];
						break;
					case "Bottom": 
						var p = this.parentNode.nextSibling;
						if (!p) return undefined;
						return p.cells[this.cellIndex];
						break;
				}
			}
			cell.generate = function()
			{
				if (this.visited) return;
				this.visited = true;
				var d0 = Math.floor(4*Math.random());
				for (var i=0;i<4;++i)
				{
					var d = directions[d0];
					var c = this.getNeighbor(d);
					d0 = (d0+1)%4;
					if (!c || c.visited) continue;
					this.setWallColor(d,"transparent");
					c.setWallColor(opposite[d],"transparent");
					c.generate();
				}
			}
		}
	}
	
	return grid;
}