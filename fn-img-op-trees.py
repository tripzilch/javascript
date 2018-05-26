#operators
mul = lambda a=1, b=1: a * b
add = lambda a=0, b=0: a + b
osc = lambda x, f=1, p=0, a=1: a * sin(tau * (p + f * x))

def evex(ex, **kw):
    """Evaluate recursive tuple of (func, *args).

    Elements of args can be of type:
        float, int: constant value.
        str: look up the value in the kw dict
        tuple: first element is a function. recursively call evex
          on the rest of the tuple. call the function with that as
          the *arguments.          
    """
    if isinstance(ex, str):
        return kw[ex]
    elif isinstance(ex, (float, int)):
        return float(ex)
    else:
        func, *args = ex
        args = (evex(a, **kw) for a in args)
        return func(*args)

def explot(ax, ex, N=500, extent=[-2, 2]):
    x = y = linspace(extent[0], extent[1], num=N)
    X, Y = meshgrid(x, y)
    ax.set_xlim(0,1)
    ax.set_ylim(0,1)
    ax.imshow(evex(ex, x=X, y=Y), cmap='Spectral', extent=(0,1,0,1))        

# mul(a, sin(add(p, mul(w, x))))
#ex0 = (mul, 'a', (sin, (add, 'p', (mul, 'w', 'x'))))
ex1 = (add, (osc, 'x', 2, 5), (osc, 'y', 3, 6, 2))

