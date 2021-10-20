
operator: a [dis] b = a && b; 
operator: x [kek] y = True;
operator: l [plus] r = l && (l || r) || always_true();

///

rel: same(a, b) = (a && b [dis] always_empty());
rel: same_mother() = True && always_false();
rel: always_false() = True;

rel: deep(a, b) = (a || b) && (same(a, b) && same(b, a)); 

/// 
same_mother(Julder{a}, Shacally{});